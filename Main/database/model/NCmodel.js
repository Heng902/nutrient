
const mongoose = require("mongoose");
const NCschema = require("./schema/NCschema.js");

module.exports = mongoose.model("NutrientContent", NCschema);