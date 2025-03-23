import express from 'express';
import { PORT, SECRET_JWT_KEY, SERVER_WEB} from './config.js';
import { userRepository } from './user-repository.js';
import jwt from 'jsonwebtoken';
import path from 'node:path';
import cookieParser from 'cookie-parser';

const app = express();
app.disable("x-powered-by");

app.use(cookieParser());
app.use(express.static(SERVER_WEB, {index : false}));
app.use(express.json());

app.get('/data', (req, res) =>{
    const token = req.cookies.access_token;
    const data = jwt.verify(token, SECRET_JWT_KEY);
    res.json({
        username: data.username
    })
});


app.get('/:page?', (req, res) =>{
    const token = req.cookies.access_token;
    if(!token){
        return res.sendFile(path.join(SERVER_WEB,  'index.html'));
    }
    try{
        jwt.verify(token, SECRET_JWT_KEY);
        res.sendFile(path.join(SERVER_WEB,  'protected.html'));
    }catch(err){
        res.sendFile(path.join(SERVER_WEB,  'index.html'));
    }
    });

app.post('/login', async (req, res) =>{
    const {username, password} = req.body;
    try{
        //logear usuario
        const user = await userRepository.login({username, password});
        //crear token
        const token = jwt.sign({id : user._id, username : user.username}, SECRET_JWT_KEY,{expiresIn: '1h'});
        //guardar en cookie
        res.cookie('access_token', token,{
            httpOnly : true,
            secure : process.env.NODE_ENV == 'production',
            sameSite : 'strict',
            maxAge : 1000 * 60 * 60
        })
        .send({user, token});
    }catch(error){
        res.status(401).send(error.message);
    }
});
app.post('/register', async (req, res) =>{
    const {username, password} = req.body
    try{
        const id = await userRepository.create({username, password});
        const token = jwt.sign({id, username}, SECRET_JWT_KEY, {expiresIn: '1h'});
        res.cookie('access_token', token,{
            httpOnly : true,
            secure : process.env.NODE_ENV == "production",
            sameSite : 'strict',
            maxAge : 1000 * 60 * 60
        }).send({username, token});
    }catch(error){
        res.status(401).send(error.message);
    }
});
app.post('/logout', (req, res) =>{
    res.clearCookie("access_token");
    res.sendStatus(200);

});
app.listen(PORT, ( ) => {
    console.log(`Server listening on port ${PORT}`);
})





