const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const Biologia = require("../models/biologia.js");
const Fisica = require("../models/fisica.js");
const Filosofia = require("../models/filosofia.js");

router.use(express.json())


router.get(/(\bFilosofia\b)|(\bBiologia\b)|(\bFisica\b)/, async (req, res)=>{
	const linkUrl = (req.url).slice(1);
	let category;

	if(linkUrl == "Filosofia") category = Filosofia;
	else if (linkUrl == "Biologia") category = Biologia;
	else if (linkUrl == "Fisica") category = Fisica;

	//

	try{
		const search = await category.find();

		const searchOrder = search.sort(function(a, b){
			if( Number(a.point) > Number(b.point) ){
				return -1;
			} else if(Number(a.point) < Number(b.point)){
				return 1;
			}
			return 0;
		});
		console.log(searchOrder);

		let found = []; 
		for(let i = 0; i < 10; i++){
			if(searchOrder[i] == undefined) break;
			found.push(searchOrder[i]);
		}
		console.log(found);

		res.render("result.ejs", {data : found} );

	} catch (e){
		console.log("Ocurrió un error: ", e.name, e.message);
		res.render("result.ejs", {data : {
			name: "Error 404",
			age: "Error 404",
			point: "Error 404",
		}})
	}

	
})

router.post("/", async (req, res)=>{
	const data = req.body;
	let category;

	//data.name | data.age | data.point | data.category//

	if(data.category == "Filosofia") category = Filosofia;
	else if (data.category == "Biologia") category = Biologia;
	else if (data.category == "Fisica") category = Fisica;

	try{
		const person = new category({
			name: data.name,
			age: data.age,
			point: data.point,
		});

		await person.save();
	}catch(e){
		console.log("Ocurrió un error: ", e.name, e.message);
	}

	res.send("Upload");
});


module.exports = router;