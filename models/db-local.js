import DBLocal from 'db-local';
import { SALT_ROUNDS } from '../config.js'
import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
const { Schema } = new DBLocal({path: './db' }); 

const User = Schema('user', {
    _id : {type : String, required : true},
    username : {type : String, required : true},
    password : {type : String, required : true}
})

export class authModel{
    static async getByUsername({username}){
        const user = User.findOne({username});
        if(!user){
            return null;
        }
        return user;
    }
    static async comparePassword({password, userPassword}){
        const isValid = await bcrypt.compare(password, userPassword);
        return isValid;
    }
    static async createUser({username, password}){
        const id = crypto.randomUUID();
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        const newUser = User.create({
            _id : id,
            username: username,
            password: hashedPassword
        }).save();
        return newUser;
    }
}
