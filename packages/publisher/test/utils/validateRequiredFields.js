'use strict';

const Lab = require('lab');
const lab = exports.lab = Lab.script();
const describe = lab.experiment;
const it = lab.it;
const Code = require('code');
const expect = Code.expect;

const uuid = require('uuid/v4'); // creates a random uuid

const validateRequiredFields = require('../../src/utils/validateRequiredFields');

describe('validateRequiredFields()', () => {
  it('should approve fields', (done) => {
    const msg = {
      userId: 0,
      event: 'btn_click'
    };

    validateRequiredFields(msg, onValidate);
    function onValidate (err, result) {
      expect(err).to.not.exist();
      expect(result).to.be.a.object();
      expect(result).to.be.equal(msg);
      done();
    }
  });

  it('should reject fields with wrong keys', (done) => {
    const msg = {
      id: uuid(),
      event: 'btn_click'
    };

    validateRequiredFields(msg, onValidate);
    function onValidate (err, result) {
      expect(err).to.exist();
      expect(err.message).to.equal('Invalid fields.');
      done();
    }
  });

  it('should reject fields that dont have the correct number of fields', (done) => {
    const msg = {
      event: 'btn_click'
    };

    validateRequiredFields(msg, onValidate);
    function onValidate (err, result) {
      expect(err).to.exist();
      expect(err.message).to.equal('Invalid fields.');
      done();
    }
  });
});
