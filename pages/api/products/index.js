// pages/api/products/index.js

import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});
const upload = multer({ storage: storage });

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async (req, res) => {
    const db = await open({
        filename: './mydb.sqlite',
        driver: sqlite3.Database,
    });

    await db.run(`CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        description TEXT,
        price INTEGER,
        image TEXT
    )`);

    if (req.method === 'GET') {
        const products = await db.all('SELECT * FROM products');
        res.status(200).json(products);
    } else if (req.method === 'POST') {

        const multerSingle = upload.single('image');

        await new Promise((resolve, reject) =>
            multerSingle(req, res, (error) => (error ? reject(error) : resolve()))
        );

        const { name, description, price } = req.body;
        const image = req.file.filename;
        await db.run(
            'INSERT INTO products (name, description, price, image) VALUES (?, ?, ?, ?)',
            [name, description, price, image],
        );
        res.status(201).json({ success: true });

    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
};
