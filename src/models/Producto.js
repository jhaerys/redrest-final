const { Schema, model } = require("mongoose");

const productoSchema = new Schema({
    nombre: {
        type: String,
        required: true,
    },
    valor: {
        type: Number,
        required: true,
    },
    descripcion: {
        type: String,
        required: true,
    },
    user: {
        type: String,
        required: true,
    },
});

module.exports = model("Producto", productoSchema);