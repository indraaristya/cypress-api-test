const categorySchema = {
    id: {
        type: "number",
    },
    name: {
        type: "string"
    }
}

module.exports.addPetResponse = {
    type: "object",
    properties: {
        id: {
            type: "number"
        },
        category: {
            type: "object",
            properties: categorySchema
        },
        name: {
            type: "string"
        },
        photoUrls: {
            type: "array"
        },
        tags: {
            type: "array"
        },
        status: {
            type: "string"
        }
    },
    required: ["id", "category", "name", "photoUrls", "tags", "status"]
}