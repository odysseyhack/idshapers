
var request = require('request');
var app = require("../index");

describe('GET /listAllEntries', function(){
  it('respond with empty array', function(done){
    request(app)
      .get('/listAllEntries')
      .set('Accept', 'application/json')
      .expect(200)
      .end(function(err, res){
        if (err) return done(err);
        done()
      });
  })
});