const hbs = require("handlebars");

hbs.registerHelper("modificar", (texto) => {
    let palabras = texto.split(" ");
    palabras.forEach((palabra, idx) => {
        palabras[idx] =
            palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase();
    });

    return palabras.join(" ");
});