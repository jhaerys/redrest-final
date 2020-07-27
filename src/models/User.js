const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");
const usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: true,
    },
    apellido: {
        type: String,
        required: true,
    },
    correo: {
        type: String,
        required: true,
        unique: true,
    },
    telefono: {
        type: String,
    },
    pass: {
        type: String,
        required: true,
    },
});

usuarioSchema.methods.encrypContrasena = async(pass) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(pass, salt);
};

usuarioSchema.methods.compararContrasena = async function(pass) {
    return await bcrypt.compare(pass, this.pass);
};

module.exports = model("User", usuarioSchema);