// test.js
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index'); 
const expect = chai.expect;

chai.use(chaiHttp);

describe('File Upload API', () => {
  it('should return a success message and filename when uploading a file', (done) => {
    chai.request(app)
      .post('/upload')
      .attach('file', './uploads/file.pdf') // path to a test file
      .end((err, res) => {
        if (err) {
          return done(err); // Catch any error and pass it to Mocha
        }

        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message').equal('File uploaded successfully');
        expect(res.body).to.have.property('filename').that.is.a('string');
        done();
      });
  });

  it('should return an error message when no file is uploaded', (done) => {
    chai.request(app)
      .post('/upload')
      .end((err, res) => {
        if (err) {
          return done(err); // Catch any error and pass it to Mocha
        }

        expect(res).to.have.status(400);
        expect(res.body).to.have.property('error').equal('No file uploaded');
        done();
      });
  });
});
