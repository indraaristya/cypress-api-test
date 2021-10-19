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
            .should((response) => {
                cy.log(JSON.stringify(response.body))
                expect(validate(response.body)).to.be.true;
                expect(response.status).to.equal(200);
                expect(response.body.name).to.equal(addPetData.name);
                expect(response.body).to.have.all.keys("id", "category", "name", "photoUrls", "tags", "status");
                expect(response.body.category).to.have.all.keys("id", "name");
            })
        })
    })

    context("GET /pet/{id} by petId", () => {
        it("should success get pet with valid petId", () => {
            cy.request({
                method: "GET",
                url: `/pet/${getPetData.id}`,
            })
            .should((response) => {
                cy.log(JSON.stringify(response.body))
                expect(validate(response.body)).to.be.true;
                expect(response.status).to.equal(200);
                expect(response.body.id).to.equal(getPetData.id);
                expect(response.body.name).to.equal(getPetData.name);
                expect(response.body).to.have.all.keys("id", "category", "name", "photoUrls", "tags", "status");
                expect(response.body.category).to.have.all.keys("id", "name");
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
                body: newPetData
            })
            .should((response) => {
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
    })

    context("DELETE /pet/{id} existed pet by petId", () => {
        it("should success delete pet with valid petId", () => {
            cy.request({
                method: "DELETE",
                url: `/pet/${deletePetData.id}`,
            })
            .should((response) => {
                cy.log(JSON.stringify(response.body))
                expect(response.status).to.equal(200);
                expect(response.body.code).to.equal(200);
                expect(response.body).to.have.all.keys("code", "type", "message");
            })
        })
    })
})