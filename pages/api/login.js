import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import jwt from 'jsonwebtoken';

export default async (req, res) => {
    const db = await open({
        filename: './mydb.sqlite',
        driver: sqlite3.Database,
    });

    if (req.method === 'POST') {
        const { email, password } = req.body;

        // Get user from the database
        const user = await db.get('SELECT * FROM users WHERE email = ?', [email]);

        if (user && user.password === password) {

            user.token = jwt.sign({ id: user.id }, 'some_secret_key', { expiresIn: '1h' });
            delete user['password'];
            res.status(200).json({ success: true, user });
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
};
