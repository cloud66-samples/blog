'use strict';

const Lab = require('lab');
const lab = exports.lab = Lab.script();
const describe = lab.experiment;
const it = lab.it;
const Code = require('code');
const expect = Code.expect;

const { analyticsKeyTable, publisher } = require('../../../config');
const getKey = require('../../src/utils/getKey');

describe('getKey()', () => {
  it('should return the default key', (done) => {
    const key = getKey(analyticsKeyTable, 'random', publisher.defaultKey);
    expect(key).to.be.a.string();
    expect(key).to.be.equal(publisher.defaultKey);
    done();
  });

  it('should return a key from the table', (done) => {
    const key = getKey(analyticsKeyTable, 'btn_click', publisher.defaultKey);
    expect(key).to.be.a.string();
    expect(key).to.be.equal('analytics.btn');
    done();
  });
});
