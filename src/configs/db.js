const { connect } = require("http2");
const mongoose = require("mongoose");

module.exports = connect(
    "mongodb+srv://rushpandav96:7249840809r@cluster0.acime.mongodb.net/todo?retryWrites=true&w=majority"
);