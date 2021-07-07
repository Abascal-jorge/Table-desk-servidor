const express = require("express");
const app =  express();
const auth = require("../../controllers/crear usuarios/auth");

app.post(
    "/google",
    auth.googleSignin    
);

app.post(
    "/facebook",
    auth.facebookSignin
);

app.post(
    "/logincorreo",
    auth.correoSing
);

module.exports = app;