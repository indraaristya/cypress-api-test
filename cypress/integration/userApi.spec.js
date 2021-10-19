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

    const failedAddUserData = {
        id: "abc",
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

    const updateUserData = {
        id: 101,
        username: "string1811",
        firstName: "string",
        lastName: "string",
        email: "string",
        password: "string",
        phone: "string",
        userStatus: 1
    }

    const deleteUserData = {
        id: 102,
        username: "string1812",
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

        cy.request({
            method: "POST",
            url: "/user",
            body: updateUserData
        })

        cy.request({
            method: "POST",
            url: "/user",
            body: deleteUserData
        })
    });

    const validate = ajv.compile(userSchema)

    context("POST /user to add new user", () => {
        it("should success add new user with valid data", () => {
            cy.request({
                method: "POST",
                url: "/user",
                body: addUserData,
                failOnStatusCode: false
            })

            .should((response) => {
                cy.log(JSON.stringify(response.body));
                expect(response.status).to.equal(200);
            })
        })

        it("should return error when add new user with invalid data", () => {
            cy.request({
                method: "POST",
                url: "/user",
                body: failedAddUserData,
                failOnStatusCode: false
            })

            .should((response) => {
                cy.log(JSON.stringify(response.body));
                expect(response.status).to.equal(500);
            })
        })
    })

    context("GET /user by username", () => {
        it("should success get user by valid username", () => {
            cy.request({
                method: "GET",
                url: `/user/${getUserData.username}`,
                failOnStatusCode: false
            })

            .should((response) => {
                cy.log(JSON.stringify(response.body));
                expect(response.status).to.equal(200);
                expect(validate(response.body)).to.be.true;
                expect(response.body.username).to.equal(getUserData.username);
            })
        })

        it("should error when get user by invalid username", () => {
            cy.request({
                method: "GET",
                url: `/user/00`,
                failOnStatusCode: false
            })

            .should((response) => {
                cy.log(JSON.stringify(response.body));
                expect(response.status).to.equal(404);
            })
        })
    })

    context("PUT /user/{username} update username", () => {
        it("should success update user by valid username and data", () => {
            const newUserData = {
                ...updateUserData
            }
            newUserData.username = 'newusername1810';
            
            cy.request({
                method: "PUT",
                url: `/user/${updateUserData.username}`,
                body: newUserData,
                failOnStatusCode: false
            })

            .should((response) => {
                cy.log(JSON.stringify(response.body));
                expect(response.status).to.equal(200);
            })
        })

        it("should return errorn when update user by invalid username and data", () => {
            const newUserData = {
                ...updateUserData
            }
            newUserData.username = 'newusername1810';
            newUserData.id = 'zz';
            
            cy.request({
                method: "PUT",
                url: `/user/zz`,
                body: newUserData,
                failOnStatusCode: false
            })

            .should((response) => {
                cy.log(JSON.stringify(response.body));
                expect(response.status).to.equal(500);
            })
        })
    })

    context("DELETE /user/{username} to delete user by username", () => {
        it("should success delete user by valid username", () => {
            cy.request({
                method: "DELETE",
                url: `/user/${deleteUserData.username}`,
                failOnStatusCode: false
            })

            .should((response) => {
                cy.log(JSON.stringify(response.body));
                expect(response.status).to.equal(200);
            })
        })

        it("should return error when delete user by invalid username", () => {
            cy.request({
                method: "DELETE",
                url: `/user/zz`,
                failOnStatusCode: false
            })

            .should((response) => {
                cy.log(JSON.stringify(response.body));
                expect(response.status).to.equal(404);
            })
        })
    })
})