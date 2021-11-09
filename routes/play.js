const express = require("express");
const router = express.Router();

router.get("/",(req, res)=>{
    res.render("play.ejs");
});


module.exports = router;