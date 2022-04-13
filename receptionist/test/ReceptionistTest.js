let chai = require('chai');
let chaiHttp = require('chai-http');
const { response } = require('express');
const { expect } = require("chai");
const server = require("../ReceptionistController");

//assertion style
chai.should();

chai.use(chaiHttp);

  /**
   * Test the GET route
   */

describe("Receptionist API", () => {
  describe("GET /getAllReceptionists", () => {
    it("It should get all the Receptionists", (done) => {
      chai.request("http://localhost:4444")
        .get("/getAllReceptionist")
        .end((err, response) => {
          response.should.have.status(200);
          done();
        })

    })
    it("It should NOT GET all the Receptionists", (done) => {
      chai
        .request("http://localhost:4444")
        .get("/getreceptttttt")
        .end((err, response) => {
          response.should.have.status(400);
          done();
        });
    });
  })

});


  /**
   * Test the GET(by ID) route
   */
describe("GET ReceptionistById/:_id", () => {
  it("It should GET a Receptionist by id", (done) => {
    const id = "621867ac59e37aa51f61fa3a";
    chai
      .request("http://localhost:4444/getReceptionistById")
      .get("/" + id)
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.be.a("object");
        response.body.should.have.property("ReportingManager");
        response.body.should.have.property("ReceptionistName");
        done();
      });
  });
});

/**
 * Test the POST route
 */
describe("POST /addReceptionist", () => {
  it("It should POST a new Receptionist", (done) => {
    const receptionist = {
        managerId: "6213d2d06fb3b0cb903ca00d",
        receptionistName: "qwwr",
        receptionistAge: 20,
        receptionistGender:"F"
    };
    chai
      .request("http://localhost:4444")
      .post("/addReceptionist")
      .send(receptionist)
      .end((err, response) => {
        response.should.have.status(200);
        done();
      });
  });
  
});