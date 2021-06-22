const express = require("express");
const app =  express();
const auth = require("../../controllers/crear usuarios/auth");

app.get(
    "/auth",
    auth.googleSignin    
);

module.exports = app;