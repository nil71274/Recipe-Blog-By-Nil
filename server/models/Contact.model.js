const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: "This is required."
    },
    email: {
        type: String,
        required: "This is required."
    },
    message: {
        type: String,
        required: "This is required."
    }
});


module.exports = mongoose.model('Contact', contactSchema);