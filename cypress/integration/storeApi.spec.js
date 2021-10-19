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

    const getOrder = {
        id: 11,
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
    });

    const validate = ajv.compile(orderSchema)

    context("POST /store to place an order for a pet", () => {
        it("should success to place an order with valid data", () => {
            cy.request({
                method: 'POST',
                url: "/store/order",
                body: addNewOrder
            })
            .should((response) => {
                cy.log(JSON.stringify(response.body));
                expect(validate(response.body)).to.be.true;
                expect(response.status).to.equal(200);
                expect(response.body.id).to.equal(addNewOrder.id);
            })
        })
    })

    context("GET /store/{id} to get an valid order for a pet", () => {
        it("should success to get an order with valid data", () => {
            cy.request({
                method: 'GET',
                url: `/store/order/${getOrder.id}`,
            })
            .should((response) => {
                cy.log(JSON.stringify(response.body));
                expect(validate(response.body)).to.be.true;
                expect(response.status).to.equal(200);
                expect(response.body.id).to.equal(getOrder.id);
            })
        })
    })
})