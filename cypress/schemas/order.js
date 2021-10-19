module.exports.addOrderResponse = {
    type: "object",
    properties: {
        id: {
            type: "number"
        },
        petId: {
            type: "number"
        },
        quantity: {
            type: "number"
        },
        shipDate: {
            type: "string"
        },
        status: {
            type: "string"
        },
        complete: {
            type: "boolean"
        }
    },
    required: ["id", "petId", "quantity", "shipDate", "status", "complete"]
}