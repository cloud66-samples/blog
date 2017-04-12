'use strict';

const Lab = require('lab');
const lab = exports.lab = Lab.script();
const describe = lab.experiment;
const before = lab.before;
// const after = lab.after;
const it = lab.it;
const Code = require('code');
const expect = Code.expect;

const publisher = require('../src/publisher');
// const sinon = require('sinon');
// const amqp = require('amqplib/callback_api');

describe('publisher', () => {
  // TOFIX: only works with it.only (issue with publisher.getInstance)
  // describe('with a invalid connection', () => {
  //   let sandbox;
  //   let connectStub;
  //
  //   before((done) => {
  //     sandbox = sinon.sandbox.create();
  //     connectStub = sandbox.stub(amqp, 'connect').callsFake((options, callback) => {
  //       return callback(new Error('Err'));
  //     });
  //     done();
  //   });
  //
  //   after((done) => {
  //     sandbox.restore();
  //     done();
  //   });
  //
  //   it('should throw an error when amqp.connect() is called', (done) => {
  //     publisher.getInstance((err, result) => {
  //       expect(connectStub.called).to.be.true();
  //       expect(err).to.exist();
  //       expect(err).to.be.an.object();
  //       expect(err.message).to.be.equal('Err');
  //       done();
  //     });
  //   });
  // });

  describe('with a valid connection', () => {
    let pub;

    before((done) => {
      publisher.getInstance((err, result) => {
        expect(err).to.not.exist();
        expect(result).to.be.an.object();
        pub = result;
        done();
      });
    });

    it('publishMsg() should publish a message', (done) => {
      pub.publishMsg('analytics.test', 'some message', (err, result) => {
        expect(err).to.not.exist();
        expect(result).to.be.equal('Message sent!');
        done();
      });
    });

    it('closeConnection() should close a connection', (done) => {
      pub.closeConnection(() => {
        done();
      });
    });
  });
});
