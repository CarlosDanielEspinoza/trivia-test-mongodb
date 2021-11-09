const mongoose = require("mongoose");
const dotenv =require("dotenv").config();

const uri = `mongodb+srv://${process.env.US}:${process.env.PASSWORD}@kurocluster.o0ej6.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;

const conectBD = async()=>{
	mongoose.connect(uri, {useNewUrlParser: true , useUnifiedTopology: true})
    .then(()=> {
        console.log("Base de datos conectada");
    }).catch((e)=>{
        console.log(e);
	});

}

module.exports = conectBD;