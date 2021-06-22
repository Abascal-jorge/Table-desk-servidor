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

app.get(
     "/usuario/:id",
     usuario.getUsuarioID
);

app.put(
     "/usuario/:id",
     usuario.putActualizarUsuario
);

app.delete(
     "/usuario/:id",
     usuario.deleteUsuario
);

module.exports = app;