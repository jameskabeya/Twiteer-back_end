const express = require('express');
const products = require('../../Model/data');
const app = express();

app.use(express.json())

const Postposts = ('', (req, res) => {
    const newProduct = {
        id: products.length + 1,
        name: req.body.name,
        price: req.body.price,
        image: req.body.image
    }
    products.push(newProduct)
    res.status(201).json(products)
})

const Postput = ('/:id', (req, res) => {
    const id = Number(req.params.id)
    const index = products.findIndex(product => product.id === id)
    if (index === -1) {
        return res.status(404).send('try again')
    }
    const updatedProduct = {
        id: products[index].id,
        name: req.body.name,
        price: req.body.price,
        image: req.body.image
    }
    products[index] = updatedProduct
    res.status(200).json('Product updated')
})

// app.get('/', (req, res) => {
//     res.json(products)
// })

const Postget = ('/', (req, res) => {
    res.json(products)
})

const PostgetId = ('/:id', (req, res) => {
    const id = Number(req.params.id)
    const product = products.findIndex(products => products.id === id)

    res.json(product)
})

const Postdelete = (req, res) => {
    const id = Number(req.params.productID)
    const index = products.findIndex(product => product.id === id)
    if (index === -1) {
        return res.status(404).json(products)
    }
    products.splice(index,1)
    res.status(200).json(products)
}

// const Postput = ('/:id', (req, res, next) => {
//     const products = products;
//     products.updateOne({ _id: req.params.id }, 
//         { ...req.body, _id: req.params.id })
//        res.status(200).json({ message: 'Objet modifié !'})
//       res.status(400).json({ error });
//   });

// app.delete('/:id', (req, res, next) => {
//     products.deleteOne({_id: req.params.id})
//         res.status(200).json({message: 'Deleted!'});


//         products.splice(index,1)
//         res.status(400).json({error: error});
//   });

module.exports = { Postposts, Postput, Postget, Postdelete,PostgetId };
