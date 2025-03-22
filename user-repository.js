import DBLocal from 'db-local';
import { SALT_ROUNDS } from './config.js'
import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import { validateUser } from  './schemas/user.js'
const { Schema } = new DBLocal({path: './db' }); 

const User = Schema('user', {
    _id : {type : String, required : true},
    username : {type : String, required : true},
    password : {type : String, required : true}
})

export class userRepository{

    static async login({username, password}){
        //los datos son validos?
        const result = validateUser({username, password});
        if(!result.success) throw new Error(result.error.errors.map(error => error.message).join(", "));
        //el usuario existe?
        const user = User.findOne({username})
        if(!user) throw new Error("This user doesn´t exist")
        //contraseña correcta?
        const isValid = await bcrypt.compare(password, user.password);
        if(!isValid) throw new Error("Wrong password");

        //return public dates
        return {
            _id : user._id,
            username : user.username
        }
    }


    static async create({username, password}){

        //validaciones
        const result = validateUser({username, password});
        if(!result.success) throw new Error(result.error.errors.map(error => error.message).join(", "));
        if(User.findOne({username})) throw new Error ("This user already exist");

        //hasheo de password
        const id = crypto.randomUUID()
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        //añadir a base de datos
        User.create({
            _id : id,
            username: username,
            password: hashedPassword
        }).save();

        return id;
    }
}