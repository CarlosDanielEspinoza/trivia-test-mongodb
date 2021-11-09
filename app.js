const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const port = process.env.PORT || 3000;
app.set("view engine","ejs");
app.set("views", __dirname + "/views");

const mongo = require("./mongo.js");
mongo();

const root = require("./routes/root.js");
const play = require("./routes/play.js");
const category = require("./routes/category.js")
const result = require("./routes/result.js");

app.use(express.static(__dirname + "/public"));

app.use("/", root);
app.use("/play", play);
app.use("/category", category);
app.use("/result", result);


app.use((req,res,next) => {
	res.status(404).send("Error 404: Page not Found");
});
app.listen(port, () =>{
    console.log(`App en el puerto ${port}`);
});