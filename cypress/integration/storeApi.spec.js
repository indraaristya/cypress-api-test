const Ajv = require("ajv");
const ajv = new Ajv();

const orderSchema = require('../schemas/order.js').addOrderResponse;

describe("Store endpoint", () => {
    const addNewOrder = {
        id: 10,
        petId: 11,
        quantity: 1,
        shipDate: "2021-10-19T11:30:47.494Z",
        status: "placed",
        complete: true
    }

    const failedAddNewOrder = {
        id: "abc",
        petId: 11,
        quantity: 1,
        shipDate: "2021-10-19T11:30:47.494Z",
        status: "placed",
        complete: true
    }

    const getOrder = {
        id: 5,
        petId: 12,
        quantity: 1,
        shipDate: "2021-10-19T11:30:47.494Z",
        status: "placed",
        complete: true
    }

    const deleteOrder = {
        id: 12,
        petId: 12,
        quantity: 1,
        shipDate: "2021-10-19T11:30:47.494Z",
        status: "placed",
        complete: true
    }

    before(() => {
        cy.request({
            method: "POST",
            url: "/store/order",
            body: getOrder
        })

        cy.request({
            method: "POST",
            url: "/store/order",
            body: deleteOrder
        })
    });

    const validate = ajv.compile(orderSchema)

    context("POST /store to place an order for a pet", () => {
        it("should success to place an order with valid data", () => {
            cy.request({
                method: 'POST',
                url: "/store/order",
                body: addNewOrder,
                failOnStatusCode: false
            })
            .should((response) => {
                cy.log(JSON.stringify(response.body));
                expect(validate(response.body)).to.be.true;
                expect(response.status).to.equal(200);
                expect(response.body.id).to.equal(addNewOrder.id);
            })
        })

        it("should return error when place an order with invalid data", () => {
            cy.request({
                method: 'POST',
                url: "/store/order",
                body: failedAddNewOrder,
                failOnStatusCode: false
            })
            .should((response) => {
                cy.log(JSON.stringify(response.body));
                expect(response.status).to.equal(500);
            })
        })
    })

    context("GET /store/{id} to get an valid order for a pet", () => {
        it("should success to get an order with valid data", () => {
            cy.request({
                method: 'GET',
                url: `/store/order/${getOrder.id}`,
                failOnStatusCode: false
            })
            .should((response) => {
                cy.log(JSON.stringify(response.body));
                expect(validate(response.body)).to.be.true;
                expect(response.status).to.equal(200);
                expect(response.body.id).to.equal(getOrder.id);
            })
        })

        it("should return error message when get an order with invalid data", () => {
            cy.request({
                method: 'GET',
                url: `/store/order/abc`,
                failOnStatusCode: false
            })
            .should((response) => {
                cy.log(JSON.stringify(response.body));
                expect(response.status).to.equal(404);
            })
        })
    })

    context("DELETE /store/{id} to delete an valid order for a pet", () => {
        it("should success to delete an order with valid id", () => {
            cy.request({
                method: 'DELETE',
                url: `/store/order/${getOrder.id}`,
                failOnStatusCode: false
            })
            .should((response) => {
                cy.log(JSON.stringify(response.body));
                expect(response.status).to.equal(200);;
            })
        })

        it("should return error message when delete an order with invalid id", () => {
            cy.request({
                method: 'DELETE',
                url: `/store/order/abc`,
                failOnStatusCode: false
            })
            .should((response) => {
                cy.log(JSON.stringify(response.body));
                expect(response.status).to.equal(404);;
            })
        })
    })
})