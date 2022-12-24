var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://0.0.0.0:27017'
const { Int32, ObjectId } = require('bson')

async function insertProduct(newProduct) {
    let client = await MongoClient.connect(url)
    let db = client.db("GCH1003")
    let newId = await db.collection("products").insertOne(newProduct)
    return newId
}
async function getAllProducts() {
    let client = await MongoClient.connect(url)
    let db = client.db("GCH1003")
    const results = await db.collection("products").find().toArray()
    return results
}
async function deleteProductById(id) {
    let client = await MongoClient.connect(url)
    let db = client.db("GCH1003")
    await db.collection("products").deleteOne({ _id: ObjectId(id) })
}
async function updateProduct(id, name, price, picture) {
    let client = await MongoClient.connect(url)
    let db = client.db("GCH1003")
    await db.collection("products").updateOne({ _id: ObjectId(id) },
        { $set: { "name": name, "price": price, "pictureURL": picture } })
}
async function findProductById(id) {
    let client = await MongoClient.connect(url)
    let db = client.db("GCH1003")
    const productToEdit = await db.collection("products").findOne({ _id: ObjectId(id) })
    return productToEdit
}
async function searchProductByName(name){
    let client = await MongoClient.connect(url)
    let db = client.db("GCH1003")
    const results = await db.collection("products").find({ name: new RegExp(name,'i') }).toArray()
    return results
}
module.exports = {insertProduct,getAllProducts,deleteProductById,updateProduct,
    findProductById,searchProductByName}
