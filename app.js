const express = require("./node_modules/express");
const cors = require("./node_modules/cors");
const configureDb = require("./db/db");

const userCtlr = require("./MVC/controllers/UserController");

const fs = require("fs");

const multer = require("multer");

require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

configureDb();





//user api
app.post("/api/register", userCtlr.register);
app.post("/api/login", userCtlr.login);
app.post("/api/save",userCtlr.save )
app.get("/api/get",userCtlr.get)


app.listen(3003, () => {
  console.log("listening on port:", 3003);
});





