'use strict';

const Lab = require('lab');
const lab = exports.lab = Lab.script();
const describe = lab.experiment;
const it = lab.it;
const Code = require('code');
const expect = Code.expect;

const uuid = require('uuid/v4'); // creates a random uuid
const httpMocks = require('node-mocks-http');

const bodyParser = require('../../src/utils/bodyParser');

describe('bodyParser()', () => {
  it('should return a JSON object', (done) => {
    const msg = {
      userId: uuid(),
      event: 'btn_click'
    };

    var request = httpMocks.createRequest({
      method: 'POST',
      url: '/analytics',
      body: msg,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    var response = httpMocks.createResponse();

    bodyParser(request, response, onParse);

    function onParse (err, result) {
      expect(err).to.not.exist();
      expect(result).to.be.a.object();
      expect(result).to.be.equal(msg);
      done();
    }
  });
});
