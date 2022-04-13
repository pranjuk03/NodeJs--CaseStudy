let chai = require('chai');
let chaiHttp = require('chai-http');
const { response } = require('express');
const { expect } = require("chai");
const server = require("../ManagerController");

//assertion style
chai.should();

chai.use(chaiHttp);

  /**
   * Test the GET route
   */

describe("Manager API", () => {
  describe("GET /getAllManagers", () => {
    it("It should get all the Managers", (done) => {
      chai.request("http://localhost:3333")
        .get("/getAllManagers")
        .end((err, response) => {
          response.should.have.status(200);
          done();
        })

    })
    it("It should NOT GET all the Managers", (done) => {
      chai
        .request("http://localhost:3333")
        .get("/getmanagerrrrrrrrr")
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
describe("GET ManagerById/:_id", () => {
  it("It should GET a Manager by id", (done) => {
    const id = "6218668c1c7be10afb9bee92";
    chai
      .request("http://localhost:3333/getManagerById")
      .get("/" + id)
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.be.a("object");
        response.body.should.have.property("_id");
        response.body.should.have.property("managerName");
        response.body.should.have.property("managerAge");
        response.body.should.have.property("managerGender");
        response.body.should.have
          .property("_id")
          .eq("6218668c1c7be10afb9bee92");
        done();
      });
  });
  it("It should NOT GET a Manager by id", (done) => {
    const id = "620f5d537bc00186daefa4da";
    chai
      .request("http://localhost:3333/getManagerById")
      .get("/" + id)
      .end((err, response) => {
        expect(response.body).null;
        done();
      });
  });
});

/**
 * Test the POST route
 */
describe("POST /addManager", () => {
  it("It should POST a new Manager", (done) => {
    const manager = {
        managerName: "pixis",
        managerAge: 25,
        managerGender: "M"
    };
    chai
      .request("http://localhost:3333")
      .post("/addManager")
      .send(manager)
      .end((err, response) => {
        response.should.have.status(200);
        done();
      });
  });
  
});