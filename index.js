module.exports = function(promise, args, assert, done){
  promise(args).then(function(result){
    try{
      assert(result);
      done();
    } catch(err){
      done(err);
    }
  }, done);
}
