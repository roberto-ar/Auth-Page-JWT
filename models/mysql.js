import mysql from "mysql2/promise";
import { SALT_ROUNDS } from '../config.js'
import crypto from 'node:crypto';
import bcrypt from 'bcrypt';

const config = {
    host : "localhost",
    user : "root",
    port : "3306",
    database : "authPage",
    password : "2005"
}
const connection = await mysql.createConnection(config);

export class authModel{
    static async getByUsername({username}){
        const [[user]] = await connection.query('SELECT * FROM users WHERE username = ?;', [username]);
        return user;
    }

    static async comparePassword({password, userPassword}){
        const isValid = await bcrypt.compare(password, userPassword);
        return isValid;
    }
    static async createUser({username, password}){
        const id = crypto.randomUUID();
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        await connection.query('INSERT INTO users (_id, username, password) VALUES (?, ?, ?);', [id, username, hashedPassword]);
        const [[newUser]] = await connection.query('SELECT * FROM users WHERE _id=?;', [id]);

        return newUser;
    }
}
