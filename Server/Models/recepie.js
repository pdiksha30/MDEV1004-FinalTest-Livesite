"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const recepieSchema = new mongoose_1.Schema({
    recipeID: {
        type: String,
        required: true
      },
    title: {
        type: String,
        required: true
    },
    origin: {
        type: String,
        required: true
    },
    ingredients: {
        type: [String],
        required: true
    },
    instructions: {
        type: String,
        required: true
    },
    preparationTime: {
        type: String,
        required: true
    },
    servingSize: {
        type: String,
        required: true
    },
    difficulty: {
        type: String,
        required: true
    },
    calorieCount: {
        type: Number,
        required: true
    },
    microNutrients: {
        type: String,
        required: true
    },
    sourceURL: {
        type: String,
        required: true
    },
    imageURL: {
        type: String,
        required: true
    },
});
let Recepie = (0, mongoose_1.model)('Recepie', recepieSchema);
exports.default = Recepie;
//# sourceMappingURL=recepie.js.map