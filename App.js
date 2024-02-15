const express = require("express");
const products = require("./Model/data");
const router = express.Router();
const app = express();
const Port = 5000;
const Postposts = require("./src/Controller/post_controller");

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.post('/Toposts', Postposts.Postposts);

app.get('/Toget/', Postposts.Postget);
app.get('/Toget/:id', Postposts.PostgetId);

app.put('/Toput/', Postposts.Postput);

app.delete('/Todelete/:id',Postposts.Postdelete);


app.listen(Port, (err) => {
    console.log('Online on 5000');
})
