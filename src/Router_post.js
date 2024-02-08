const express = require('express')
const app = express()

app.post('./kadea', (req, res) =>{
    res.render("index")
});