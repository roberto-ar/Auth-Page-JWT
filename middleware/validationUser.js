import jwt from 'jsonwebtoken';
import { SECRET_JWT_KEY, SERVER_WEB } from '../config.js';
import path from 'node:path';
import { validate } from '../schemas/user.js';

export function validateMiddleware(req, res, next){
    //validaciones de token
    const {username, password} = req.body;
    const token = req.cookies.access_token;
    console.log(token);
    if(token){
        try{
            jwt.verify(token, SECRET_JWT_KEY);
            return res.redirect('/protected');
        }catch(error){
            return res.sendFile(path.join(SERVER_WEB,  'index.html'));
        }
    }
    const result = validate({username, password});
    if(!result.success){
        const messages = result.error.issues.map(issue => issue.message);
        return res.status(400).json({ success: false, messages });
    } 
    next();

}

export function validateToken(req, res, next){
    try{
        const token = req.cookies.access_token;
        jwt.verify(token, SECRET_JWT_KEY);
        next();
    }catch(error){
        return res.sendFile(path.join(SERVER_WEB,  'index.html'));
    }
}