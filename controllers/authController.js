
import { SERVER_WEB } from '../config.js';
import { SECRET_JWT_KEY } from '../config.js';
import path from 'node:path';
import jwt from 'jsonwebtoken';

export class authController{
    constructor({authModel}){
        this.authModel = authModel;
    }

    index = async(req, res)=>{
        res.sendFile(path.join(SERVER_WEB,  'index.html'));
    }

    login = async(req, res) =>{
        const {username, password} = req.body;
        const user = await this.authModel.getByUsername({username});
        if(!user){
            return res.status(401).json({
                error: "Usuario no encontrado"
            })
        }
        const isValid = await this.authModel.comparePassword({password : password, userPassword : user.password});
        if(!isValid){
            return res.status(401).json({
                error: "Contraseña incorrecta"
            })
        }

        const token = jwt.sign({
            id : user._id,
            username : user.username
        }, SECRET_JWT_KEY,{expiresIn: '1h'});

        res.cookie('access_token', token,{
            httpOnly : true,
            secure : process.env.NODE_ENV == 'production',
            sameSite : 'strict',
            maxAge : 1000 * 60 * 60
        }).send({token});
    }

    register = async(req, res) =>{
        const {username, password} = req.body;
        const user = await this.authModel.getByUsername({username});
        if(user){
            return res.status(401).json({
                error: "Este username ya está registrado"
            })
        }
        const newUser = await this.authModel.createUser(username, password);
        const token = jwt.sign({
            id : newUser._id,
            username : newUser.username
        }, SECRET_JWT_KEY,{expiresIn: '1h'});

        res.cookie('access_token', token,{
            httpOnly : true,
            secure : process.env.NODE_ENV == 'production',
            sameSite : 'strict',
            maxAge : 1000 * 60 * 60
        }).send({token});
    }
    logout = async(req, res) =>{
        res.clearCookie('access_token').sendStatus(201);
    }
    data = async(req, res) =>{
    const token = req.cookies.access_token;
    const data = jwt.verify(token, SECRET_JWT_KEY);
    res.json({ username: data.username });
    }
    protected = async(req, res) =>{
        res.sendFile(path.join(SERVER_WEB,  'protected.html'));
    }
}