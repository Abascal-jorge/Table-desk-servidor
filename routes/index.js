const express = require("express");
const app = express();


app.use( require("./creacion usuario/newUsuario") );

module.exports = app;