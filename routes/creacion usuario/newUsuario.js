const express = require("express");
const app = express();
const usuario = require("../../controllers/crear usuarios")

app.post(
    "/usuario",
    usuario.postUsuario
 );
 
app.get(
     "/usuario",
     usuario.getUsuarios
);

module.exports = app;