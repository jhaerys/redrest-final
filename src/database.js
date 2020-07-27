const mongoose = require("mongoose");

const { REDREST_MONGODB_HOST, REDREST_MONGODB_DATABASE } = process.env;
const MONGODB_URI = `mongodb://${REDREST_MONGODB_HOST}/${REDREST_MONGODB_DATABASE}`;

mongoose
    .connect("mongodb://localhost/redrest" || MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    })
    .then((db) => console.log("Base de datos conectada"))
    .catch((err) => console.log(err));