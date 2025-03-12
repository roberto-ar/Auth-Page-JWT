import DBLocal from 'db-local';
import crypto from 'crypto'
const { Schema } = new DBLocal({path: './db' }); 

const User = Schema('user', {
    _id : {type : String, required : true},
    username : {type : String, required : true},
    password : {type : String, required : true}
})

export class userRepository{
    static login({username, password}){

    }
    static create({username, password}){
        if(typeof username !== String) throw new Error("El usuario debe ser un texto");
        if(username.length < 3) throw new Error("El usuario debe tener minimo 3 caracteres");
        if(typeof password !== String) throw new Error("La constraseña debe ser un texto");
        if(password.length < 3) throw new Error("La contraseña debe tener minimo 3 caracteres");
        if(User.findOne({username})) throw new Error ("Username alredy exist");
        const id = crypto.randomUUID()
        User.create({
            _id : id,
            username,
            password
        }).save();

        return id;
    }
}