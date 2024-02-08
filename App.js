const express = require("express");
const products = require("./data");
const { name } = require("ejs");
const router = express.Router();
// const About = require("About");
const app = express();
const Port = 5000;

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("hello world")
})

app.post("/Create", (req, res) => {
      const newProduct = {
         id: products.length + 1,
         name: req.body.name,
         price: req.body.price,
         image: req.body.image
      }
      products.push(newProduct)
      res.status(201).json(products)
   });

app.listen(Port, (err) => {
    console.log('Online server from 5000');
})


// const express = require('express')
// const app = express()
// const products = require('./data.js')


// app.
// app.listen(5000, () => {
//     console.log('server is listening on port 5000')
// })