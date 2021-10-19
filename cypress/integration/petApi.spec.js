const Ajv = require("ajv");
const ajv = new Ajv();

const petSchema = require('../schemas/pet.js').addPetResponse;

describe("Pet endpoint", () => {
    const addPetData = {
        id: 10,
        category: {
          id: 0,
          name: "string"
        },
        name: "doggie",
        photoUrls: [
          "string"
        ],
        tags: [
          {
            id: 0,
            name: "string"
          }
        ],
        status: "available"
    };

    const failedAddPetData = {
      id: "abcd",
      category: {
        id: 0,
        name: "string"
      },
      name: "doggie",
      photoUrls: [
        "string"
      ],
      tags: [
        {
          id: 0,
          name: "string"
        }
      ],
      status: "available"
  };

    const getPetData = {
        id: 11,
        category: {
          id: 0,
          name: "string"
        },
        name: "doggie",
        photoUrls: [
          "string"
        ],
        tags: [
          {
            id: 0,
            name: "string"
          }
        ],
        status: "available"
    };

    const updatePetData = {
        id: 12,
        category: {
          id: 0,
          name: "string"
        },
        name: "doggie",
        photoUrls: [
          "string"
        ],
        tags: [
          {
            id: 0,
            name: "string"
          }
        ],
        status: "available"
    };

    const deletePetData = {
        id: 13,
        category: {
          id: 0,
          name: "string"
        },
        name: "doggie",
        photoUrls: [
          "string"
        ],
        tags: [
          {
            id: 0,
            name: "string"
          }
        ],
        status: "available"
    };

    before(() => {
        cy.request({
            method: "POST",
            url: "/pet",
            body: getPetData
        })

        cy.request({
            method: "POST",
            url: "/pet",
            body: updatePetData
        })

        cy.request({
            method: "POST",
            url: "/pet",
            body: deletePetData
        })
    });

    const validate = ajv.compile(petSchema)

    context("POST /pet to add new pet to the store", () => {
        it("should success add new pet with valid data", () => {
            cy.request({
                method: "POST",
                url: "/pet",
                body: addPetData
            })
            .then((response) => {
                cy.log(JSON.stringify(response.body))
                expect(validate(response.body)).to.be.true;
                expect(response.status).to.equal(200);
                expect(response.body.name).to.equal(addPetData.name);
                expect(response.body).to.have.all.keys("id", "category", "name", "photoUrls", "tags", "status");
                expect(response.body.category).to.have.all.keys("id", "name");
            })
        })

        it("should return error when add new pet with invalid data", () => {
          cy.request({
              method: "POST",
              url: "/pet",
              body: failedAddPetData,
              failOnStatusCode: false
          })
          .then((response) => {
              cy.log(JSON.stringify(response.body))
              expect(response.status).to.equal(500);
          })
      })
    })

    context("GET /pet/{id} by petId", () => {
        it("should success get pet with valid petId", () => {
            cy.request({
                method: "GET",
                url: `/pet/${getPetData.id}`,
                failOnStatusCode: false
            })
            .then((response) => {
                cy.log(JSON.stringify(response.body))
                expect(validate(response.body)).to.be.true;
                expect(response.status).to.equal(200);
                expect(response.body.id).to.equal(getPetData.id);
                expect(response.body.name).to.equal(getPetData.name);
                expect(response.body).to.have.all.keys("id", "category", "name", "photoUrls", "tags", "status");
                expect(response.body.category).to.have.all.keys("id", "name");
            })
        })

        it("should return error when get pet with invalid petId", () => {
          cy.request({
              method: "GET",
              url: `/pet/abc`,
              failOnStatusCode: false
          })
          .then(response => {
              cy.log(JSON.stringify(response.body))
              expect(response.status).to.equal(404);
          })
      })
    })

    context("PUT /pet existed pet by petId", () => {
        it("should success update pet with valid petId and body request", () => {
            const newPetData = {
                ...updatePetData
            }
            newPetData.name = "updated.doggie";
            newPetData.status = "unavailable";
            cy.request({
                method: "PUT",
                url: "/pet",
                body: newPetData,
                failOnStatusCode: false
            })
            .then((response) => {
                cy.log(JSON.stringify(response.body))
                expect(validate(response.body)).to.be.true;
                expect(response.status).to.equal(200);
                expect(response.body.id).to.equal(newPetData.id);
                expect(response.body.name).to.equal(newPetData.name);
                expect(response.body.status).to.equal(newPetData.status);
                expect(response.body).to.have.all.keys("id", "category", "name", "photoUrls", "tags", "status");
                expect(response.body.category).to.have.all.keys("id", "name");
            })
        })

        it("should return error when update pet with valid petId and invalid body request", () => {
          const newPetData = {
              ...updatePetData
          }
          newPetData.name = { } ;
          newPetData.status = "unavailable";
          cy.request({
              method: "PUT",
              url: "/pet",
              body: newPetData,
              failOnStatusCode: false
          })
          .then((response) => {
              cy.log(JSON.stringify(response.body))
              expect(response.status).to.equal(500);
          })
      })
    })

    context("DELETE /pet/{id} existed pet by petId", () => {
        it("should success delete pet with valid petId", () => {
            cy.request({
                method: "DELETE",
                url: `/pet/${deletePetData.id}`,
                failOnStatusCode: false
            })
            .then((response) => {
                cy.log(JSON.stringify(response.body))
                expect(response.status).to.equal(200);
                expect(response.body.code).to.equal(200);
                expect(response.body).to.have.all.keys("code", "type", "message");
            })
        })

        it("should return error when delete pet with invalid petId", () => {
          cy.request({
              method: "DELETE",
              url: `/pet/abc`,
              failOnStatusCode: false
          })
          .then((response) => {
              cy.log(JSON.stringify(response.body))
              expect(response.status).to.equal(404);
          })
      })
    })
})