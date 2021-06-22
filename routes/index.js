const express = require("express");
const app = express();

app.use( require("./creacion usuario/newUsuario") );
app.use( require("./auth/auth") );

module.exports = app;