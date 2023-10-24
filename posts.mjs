import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

// Create a new product
router.post('/', async (req, res) => {
    const product = req.body;
    const result = await db.collection('product').insertOne(product);
    res.send(result).status(204);
  });
  
  // Read all products
router.get('/', async (req, res) => {
    const products = await db.collection('product').find({}).toArray();
    res.send(products).status(200);
  });
  
  // Read a product by ID
router.get('/:id', async (req, res) => {
    const product = await db.collection('product').findOne({ _id: ObjectId(req.params.id) });
    if (!product) {
      return res.status(404).json({ error: 'Product not found.' });
    }
    res.send(product).status(200);
  });
  
  // Update a product by ID
router.put('/:id', async (req, res) => {
    const updatedProduct = req.body;
    const result = await db.collection('product').updateOne(
      { _id: ObjectId(req.params.id) },
      { $set: updatedProduct }
    );
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Product not found.' });
    }
    res.send(updatedProduct).status(200);
  });
  
  // Delete a product by ID
router.delete('/:id', async (req, res) => {
    const result = await db.collection('product').deleteOne({ _id: ObjectId(req.params.id) });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Product not found.' });
    }
    res.json({ message: 'Product deleted successfully.' });
  });
  
  // Delete all products
router.delete('/', async (req, res) => {
    await db.collection('product').deleteMany({});
    res.json({ message: 'All products deleted successfully.' });
  });
  


export default router;