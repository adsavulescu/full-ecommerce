// pages/api/orders/index.js

import sqlite3 from "sqlite3";
import { open } from "sqlite";

export default async (req, res) => {
    const db = await open({
        filename: "./mydb.sqlite",
        driver: sqlite3.Database,
    });

    // create orders table if it doesn"t exist
    await db.run(`
        CREATE TABLE IF NOT EXISTS orders (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            userId INTEGER,
            products TEXT,
            totalPrice INTEGER,
            orderStatus TEXT
        )
    `);

    if (req.method === "GET") {
        const orders = await db.all("SELECT * FROM orders");
        res.status(200).json(orders);
    } else if (req.method === "POST") {

        const order = req.body;
        try {
            // insert new order into the database
            const result = await db.run(
                "INSERT INTO orders (userId, products, totalPrice, orderStatus) VALUES (?, ?, ?, ?)",
                [order.userId, JSON.stringify(order.products), order.totalPrice, order.orderStatus]
            );
            res.status(201).json({ orderId: result.lastID });
        } catch (e) {
            res.status(500).json({ error: e.message });
        }

    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
};
