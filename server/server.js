const express = require("express");
const app = express();
require('dotenv').config();

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))
// parse application/json
app.use(express.json())


app.use( require("../routes/index") );

app.listen(process.env.PORT, "0.0.0.0", ()=> {
    console.log("Conectado al puerto correctamente " + process.env.PORT );
});