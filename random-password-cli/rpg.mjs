#!/usr/bin/env node

//commander for the creating package
import { program } from 'commander';
//readline for creating interface
import readline from 'readline';
//crypto for generating password
import crypto from 'crypto';
//chalk for designing interactive interface
import chalk from 'chalk';
 

// Function to generate a random password
const generatePassword = (length) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+';
  const password = Array.from(crypto.randomFillSync(new Uint8Array(length)))
    .map((x) => characters[x % characters.length])
    .join('');
  return password;
}

// Define the CLI command and options using commander
program
  .version('1.0.0')
  .description('A simple CLI tool to generate a random password')
  .option('-l, --length <length>', 'Password length (default: 12)', parseInt)
  .parse(process.argv);

// Colorful welcome message
console.log(chalk.bold.green('Welcome to Password Generator CLI'));
console.log(chalk.gray('--------------------------------------'));

// If no length is provided, use interactive prompt
if (!program.length) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question(chalk.cyan('Enter password length (default: 12): '), (length) => {
    rl.close();
    const passwordLength = parseInt(length) || 12;
    const password = generatePassword(passwordLength);
    console.log(chalk.yellow(`Generated Password: ${password}`));
  });
} else {
  // Generate the password and display it
  const password = generatePassword(program.length);
  console.log(chalk.yellow(`Generated Password: ${password}`));
}
