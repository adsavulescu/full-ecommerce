// pages/api/products/[id].js

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

    const {
        query: { id },
    } = req;

    if (req.method === 'GET') {
        const product = await db.get('SELECT * FROM products WHERE id = ?', [id]);
        res.status(200).json(product);
    } else if (req.method === 'PUT') {

        const multerSingle = upload.single('image');

        await new Promise((resolve, reject) =>
            multerSingle(req, res, (error) => (error ? reject(error) : resolve()))
        );

        const { name, description, price } = req.body;
        const image = req.file.filename;
        await db.run(
            'UPDATE products SET name = ?, description = ?, price = ?, image = ? WHERE id = ?',
            [name, description, price, image, id],
        );
        res.status(200).json({ success: true });

    } else if (req.method === 'DELETE') {

        await db.run('DELETE FROM products WHERE id = ?', [id]);
        res.status(200).json({ success: true });

    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
};
