const express = require("express");
const cors = require("cors");
const products = require("./Model/data");
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const app = express();
const Port = 5000;
const Postposts = require("./src/Controller/post_controller");

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }));

app.post('/Authentication', Postposts.Authentic)
async function getUsers() {
}

app.get('/Authorization', Postposts.Authorization)

app.get('/posts', Postposts.Postposts);
app.get('/posts/:id', Postposts.Postposts);

app.get('/users/', Postposts.Postget);
app.get('/users/:id', Postposts.PostgetId);

app.put('/Toput/', Postposts.Postput);
app.delete('/Todelete/:id', Postposts.Postdelete);

// prisma.Post.create({
//     data: {
//         email: "@gmail.com",
//         password: "google",
//         isverify: true
//     }
// }).then(console.log())
// prisma.post.findMany({
//     where: { email: { startsWith: '' } }
// }).then(console.log())


app.listen(Port, (err) => {
    console.log('Online on 5000');
})
