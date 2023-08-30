import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export default async (req, res) => {
    const db = await open({
        filename: './mydb.sqlite',
        driver: sqlite3.Database,
    });

    if (req.method === 'POST') {
        const { name, email, password } = req.body;

        // Create the 'users' table if it doesn't exist
        await db.run(`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY,
                name TEXT,
                email TEXT,
                password TEXT
            )
        `);

        // Insert user into the database
        const result = await db.run(
            'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
            [name, email, password],
        );

        res.status(200).json({ success: true });
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
};
