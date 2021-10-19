module.exports.addUserResponse = {
    type: "object",
    properties: {
        id: {
            type: "number"
        },
        userStatus: {
            type: "number"
        },
        username: {
            type: "string"
        },
        firstName: {
            type: "string"
        },
        lastName: {
            type: "string"
        },
        email: {
            type: "string"
        },
        password: {
            type: "string"
        },
        phone: {
            type: "string"
        }
    }
}