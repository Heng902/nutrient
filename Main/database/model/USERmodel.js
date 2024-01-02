

const mongoose = require("mongoose");
const USERschema = require("./schema/USERschema");

module.exports = mongoose.model("user", USERschema);