const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});

const mongoose = require('mongoose');

//Connexion à la base de données
mongoose.connect('mongodb+srv://admin:admindbpassword@cluster0.ugojq2b.mongodb.net/P6-OpenClassrooms?retryWrites=true&w=majority',
    { useNewUrlParser: true, 
    useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

    const Product = require('./product.model');

// Get all products
app.get('/api/products', async (req, res) => {
    const products = await Product.find({});
    res.json({ products });
});

// Get one product
app.get('/api/products/:id', async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.json({ product });
});

// Create a new product
app.post('/api/products', async (req, res) => {
    const product = new Product(req.body);
    await product.save();
    res.json({ product });
});

// Update a product
app.put('/api/products/:id', async (req, res) => {
    await Product.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: 'Modified!' });
});

// Delete a product
app.delete('/api/products/:id', async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted!' });
});
