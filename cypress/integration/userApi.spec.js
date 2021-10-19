const Ajv = require("ajv");
const ajv = new Ajv();

const userSchema = require('../schemas/user.js').addUserResponse;

describe("User endpoint", () => {
    const addUserData = {
        id: 10,
        username: "string",
        firstName: "string",
        lastName: "string",
        email: "string",
        password: "string",
        phone: "string",
        userStatus: 1
    }

    const getUserData = {
        id: 100,
        username: "string1810",
        firstName: "string",
        lastName: "string",
        email: "string",
        password: "string",
        phone: "string",
        userStatus: 1
    }

    before(() => {
        cy.request({
            method: "POST",
            url: "/user",
            body: getUserData
        })
    });

    const validate = ajv.compile(userSchema)

    context("POST /user to add new user", () => {
        it("should success add new user with valid data", () => {
            cy.request({
                method: "POST",
                url: "/user",
                body: addUserData
            })

            .should((response) => {
                cy.log(JSON.stringify(response.body));
                expect(response.status).to.equal(200);
            })
        })
    })

    context("GET /user by username", () => {
        it("should success get user by valid username", () => {
            cy.request({
                method: "GET",
                url: `/user/${getUserData.username}`
            })

            .should((response) => {
                cy.log(JSON.stringify(response.body));
                expect(response.status).to.equal(200);
                expect(validate(response.body)).to.be.true;
                expect(response.body.username).to.equal(getUserData.username);
            })
        })
    })
})