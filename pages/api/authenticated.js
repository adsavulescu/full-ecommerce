import sqlite3 from "sqlite3";
import { open } from "sqlite";
import jwt from "jsonwebtoken";

export default async (req, res) => {
    authenticateToken(req, res, () => {
        console.log("authenticated??", req.body);
        res.status(200).end();
    });
};

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) return res.status(401).end();

    jwt.verify(token, "some_secret_key", (err, user) => {
        if (err) return res.status(403).end();
        req.user = user;
        next();
    });
};
