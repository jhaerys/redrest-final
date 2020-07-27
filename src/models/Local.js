const { Schema, model } = require("mongoose");

const localSchema = new Schema({
    nombreLocal: {
        type: String,
        required: true,
    },
    ciudad: {
        type: String,
        required: true,
    },
    direccion: {
        type: String,
        required: true,
    },
    descripcion: {
        type: String,
    },
    user: {
        type: String,
        required: true,
    },
});

module.exports = model("Local", localSchema);