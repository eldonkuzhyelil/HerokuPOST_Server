
var supertest = require("supertest");
let should = require("should");


// This agent refers to PORT where program is runninng.

var server = supertest.agent("https://agile-reef-94273.herokuapp.com/");

// UNIT test begin

describe("Unit tests",function(){

  // #1 should return home page

  it("should return home page",function(done){

    // calling home page api GET
    server
    .get("/")
    .expect("Content-type",/json/)
    .expect(200) // THis is HTTP response
    .end(function(err,res){
         
      // HTTP status should be 200     
      res.status.should.equal(200);
     // res.body.should.equal('{"message":\"Send POST with JSON format:{"address":{"colorKeys":["A","G","Z"],"values":[-20,4]},"meta":{"digits":33,"processingPattern":"d{5}+[a-z&$§]"}}\" }');
      done();
    });
  });


  it("should return expected result and status 200 - POST",function(done){

    //calling POST api
    server
    .post('/')
    .send({"address":{"colorKeys":["A","G","Z"],"values":[8,50]},"meta":{"digits":33,"processingPattern":"d{5}+[a-z&$§]"}})
    .expect("Content-type",/json/)
    .expect(200)
    .end(function(err,res){
      console.log(res.body.result)
      res.status.should.equal(200);
      //res.body.error.should.equal(false);
      res.body.result.should.equal(13); //8+50 = 58 -> 5+8=13
      done();
    });
  });

  it("should return 404 for wrong JSON - POST",function(done){

    //calling POST api
    server
    .post('/')
    .send({"address":{"colorsKeys":["A","G","Z"],"WRONG_Values_Node":[8,50]},"meta":{"digits":33,"processingPattern":"d{5}+[a-z&$§]"}})
    .expect("Content-type",/json/)
    .expect(404)
    .end(function(err,res){
      res.status.should.equal(404);
      //res.body.error.should.equal(false);
     // res.body.result.should.equal(13);
      done();
    });
  });

  it("should return 404 for non numbers in Values node - POST",function(done){

    //calling POST api
    server
    .post('/')
    .send({"address":{"colorsKeys":["A","G","Z"],"values":["8","NON-Number 50"]},"meta":{"digits":33,"processingPattern":"d{5}+[a-z&$§]"}})
    .expect("Content-type",/json/)
    .expect(404)
    .end(function(err,res){
      res.status.should.equal(404);
      //res.body.error.should.equal(false);
     // res.body.result.should.equal(13);
      done();
    });
  });

});
