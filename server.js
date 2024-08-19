const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./db/db');
const cors = require('cors');

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/products', async (req, res) => {
    const products = await db.getAll();
    res.status(200).json({ products });
})

app.listen(1337, () => console.log('Server is running on port 1337'));