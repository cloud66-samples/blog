'use strict';

const Lab = require('lab');
const lab = exports.lab = Lab.script();
const describe = lab.experiment;
const it = lab.it;
const Code = require('code');
const expect = Code.expect;

const uuid = require('uuid/v4'); // creates a random uuid

const analyticsHandler = require('../src/analyticsHandler');

describe('analytics handler', () => {
  it('should publish a message', (done) => {
    const msg = {
      userId: uuid(),
      event: 'btn_click'
    };

    analyticsHandler(msg, onPublish);
    function onPublish (err, result) {
      expect(err).to.not.exist();
      expect(result).to.be.a.string();
      expect(result).to.be.equal('Published!');
      done();
    }
  });
});
