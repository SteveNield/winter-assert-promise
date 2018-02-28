var assertPromise = require('./index.js'),
    chai = require('chai'),
    sinon = require('sinon'),
    sinonChai = require('sinon-chai');

const should = chai.should();
const expect = chai.expect;
chai.use(sinonChai);

describe('winter-assert-promise', function(){
  var sandbox,
      promise,
      assert,
      args,
      cb;

  beforeEach(function(){
    sandbox = sinon.collection;

    promise = sinon.stub();
    assert = sinon.stub();
    args = {};
    cb = sinon.stub();
  })

  afterEach(function(){
    sandbox.restore();
  })

  it('exists', function(){
    assertPromise.should.exist;
  })

  it('is a function', function(){
    assertPromise.should.be.a('Function');
  })

  it('calls the promise with specified arguments', function(){
    args = {
      x: '422',
      y: 2233,
      z: true
    };
    promise.resolves();
    assertPromise(promise, args, assert, cb);
    promise.should.have.been.calledWith(args);
  })

  describe('when promise resolves', function(){

    it('passes resolution to assertion', function(){
      const resolution = 'test-data';
      promise.resolves(resolution);
    })

    describe('when assertion passes', function(){
      it('calls done with no arguments', function(done){
        promise.resolves();
        cb.callsFake(function(arg){
          try{
            expect(arg).to.equal(undefined);
            done();
          } catch(err){
            done(err);
          }
        });
        assertPromise(promise, args, assert, cb);
      })
    })

    describe('when assertion fails', function(){
      it('calls done with an error', function(done){
        const expectedErr = new Error('Failed');
        promise.resolves();
        assert.throws(expectedErr);
        cb.callsFake(function(err){
          try{
            err.should.equal(expectedErr);
            done();
          } catch(failedAssert){
            done(failedAssert);
          }
        })
        assertPromise(promise, args, assert, cb);
      })
    })
  })

  describe('when promise rejects', function(){
    it('calls done with the rejection reason', function(done){
      const expectedReason = new Error('Cannot fulfil promise, sorry mate');
      promise.rejects(expectedReason);
      cb.callsFake(function(reason){
        try{
          reason.should.equal(expectedReason);
          done();
        } catch(err){
          done(err);
        }
      })
      assertPromise(promise, args, assert, cb);
    })
  })
})
