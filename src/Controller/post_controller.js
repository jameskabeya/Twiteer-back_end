const express = require('express');
const products = require('../../Model/data');
const users = require('../../Model/data_Authentication.js')
const jwt = require('jsonwebtoken')
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()
const app = express();

app.use(express.json())


const privatekey = `-----BEGIN RSA PRIVATE KEY-----
MIIEogIBAAKCAQEA64haUFTb3jA5IAGk5di1ELgNVZb+WP6+OWCe0FfjsaaoM6nx
zQr+8yCyftzLIOLDdCdtwKOcGOPEA9vQptubzGM73Swa8cL9MFRgEx0DyNI5wzQl
UvokKgP4xO+vP+utvN8UkgmOak3FXo/tJj3WYuYITh9z5mHbddvLB/nDnPjcJ0hK
WN7stxVyFQd/ladkspF57EsSm7ENL4cKrAqp+iQdcADZ6m/1D6CR2G2G+8ftPdL5
bIK/7b61T1mubgKpjaLyCQ2aaSUL5c8jy/zKDWK0dQLmzGzucZRPtYxN6lmmezjU
QsFyPK4Fn7O74YYoDQ7dnzMLMlUaozS0Nw/ejQIDAQABAoIBAGCAyaBIZJ2w3HcE
tW+HTwi+oJgE+cm09nPD5s4udJiBVEF2zB/a9YLgTsIz7PZYcwTQcuOPJZH9IH8E
PYVgTYF81zZTr+aGof5/U64BIV/S4t/cKb7Jxq+AWRk3q3JhOho8vMzpJXTg0JFi
HySgCYsT/SslL/Og/K5Zk+J8r21MsICf+gv5Aa6JrXIQj2oRs/shZULgkLzgteMJ
Wj9MHwFq2ozbeRLuA5/OON8Ah7NJ2oRNvAJe8Sf3MKm6WHaaFuj5gRoEjdbZ6r6H
cWKBn+F2cSl3HZKj1pBJrrTAAj+12xzrLfijVRKGHH3e0fazNSKbvX32ydwP6SOw
bVYu5nECgYEA+2bFT06YZzLZwwv6oG80TDsLTfJXo17/Ubzio+zbNMhjJRgz9i0N
+Exb2UEW4M8bM0hyY1cxHHHlcCbiM+xgljMuiTJZyJhTjPw+0x9rjhFv1hVhXfDm
UULuBnEYqHq6N+3PZYiSBDvbDYkAnQipMGYVfCaUTab23UHjzby6Q9cCgYEA79dG
DboMbR1QH82KZdsfVOchy/zyN8Zsh28kGmT5Pv1qNp7ADs8zUu4w2KanxkkvUkmA
KLYRWPp92sp5NjxbDctoEnexRBLe0+kzHTYhK8kXuFqYM2FduMpttBkuSczmX8SI
fCcMVEhVvka32c7v2IRNFgYi4TYoYboAxNsoJDsCgYBURQ6+lsnfTdxQ1SMdxCjz
pJcVebaGvME41OfjqvGPr9wMAyDn1BJquK3RFVBl6wZjGlW9luyPbF5MSbxpS0LV
FjLzKj2OUAExsRweCNo0tQOX73LD2oxZkOXYovBxCTKCrORoVG8dnDLBRrs96DlO
T+nDw+rSXLVDVWLXA/wr4QKBgAxEXnjlQy1xil+WC7YZ9whIqhnc3iasJ3Dl5lrT
P0xRedVBWWFoh59+P1FVdM9XfuwehkeOyGRcq4M9R+XWQHH8LV6EcLSionMEQnEE
C75JksUDHTXDjR+eeu3zO8LakA3l53UyKhdFe903kL+7LdlNKwQtXCtYscgN02w+
KVdxAoGAZJVqDt29saXQ8WNVYrm6lALSpCJp0sVEpsh19Ufi8lS+JrL+O9bqQU/e
FyeckAyBi9JGHy2sk7T32V2PLD2t9DyYCDE6gvbk6WchPlHLfZ59rTT7EoENj9oV
nR1pUxux2N8lwq7xPdIpd66Cn52le21fufEsCRvov6Oww1vLmuk=
-----END RSA PRIVATE KEY-----`

const publicKey = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA64haUFTb3jA5IAGk5di1
ELgNVZb+WP6+OWCe0FfjsaaoM6nxzQr+8yCyftzLIOLDdCdtwKOcGOPEA9vQptub
zGM73Swa8cL9MFRgEx0DyNI5wzQlUvokKgP4xO+vP+utvN8UkgmOak3FXo/tJj3W
YuYITh9z5mHbddvLB/nDnPjcJ0hKWN7stxVyFQd/ladkspF57EsSm7ENL4cKrAqp
+iQdcADZ6m/1D6CR2G2G+8ftPdL5bIK/7b61T1mubgKpjaLyCQ2aaSUL5c8jy/zK
DWK0dQLmzGzucZRPtYxN6lmmezjUQsFyPK4Fn7O74YYoDQ7dnzMLMlUaozS0Nw/e
jQIDAQAB
-----END PUBLIC KEY-----`

const Postposts = ('/', (req, res) => {
    const newProduct = {
        id: products.length + 1,
        name: req.body.name,
        like: req.body.like,
        comment: req.body.comment,
        image: req.body.image
    }
    products.push(newProduct)
    res.status(201).json(products)
})

const Authorization = ('/',(req,res) => {
    const client =req.headers.authorization;
    jwt.verify(client, publicKey, (err, decode) => {
      if(err){
        res.status(401).send('Unautorized')
      }else{
        res.status(200).send(products)
      }
    })
})


const  Authentic = ('/', (req, res) => {
    const { name, password } = req.body

    const valid = users.some((user) => user.name === name && user.password === password)
    
    if(valid){
        const token = jwt.sign({ name }, privatekey, { algorithm: 'RS256' })
        res.send(token)
    } else {
        res.status(403).send("Non trouvé")
    }
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

// const Postdelete = (req, res) => {
//     const id = parseInt(req.params.id)
//     const user = prisma.delete({where: {id:id}}).then()
//     res.status(200).send(`user ${id} Successfully deleted`)
//     const id = Number(req.params.productID)
//     const index = products.findIndex(product => product.id === id)
//     if (index === -1) {
//         return res.status(404).json("Id Not found")
//     }
//     products.splice(index,1)
//     res.status(200).json(products)
//     return(res.send('with succes deleted'))
// }
async function Postdelete(req, res) {
    const id = parseInt(req.params.id)
    const user = await prisma.user.delete({where: {id:id}}).then()
    res.status(200).send(`user ${id} Successfully deleted`)
}


module.exports = { Postposts, Postput, Postget, Postdelete,PostgetId,Authentic,Authorization};
