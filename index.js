import express from 'express';
import { PORT, SECRET_JWT_KEY } from './config.js';
import { userRepository } from './user-repository.js';
import { frontServer } from './middlewers/frontApp.js';
import jwt from 'jsonwebtoken';

const app = express();
app.disable("x-powered-by");

app.use(express.json());
app.use(frontServer);

app.post('/login', async (req, res) =>{
    const {username, password} = req.body;
    try{
        const user = await userRepository.login({username, password});
        const token = jwt.sign({id : user._id, username : user.username}, SECRET_JWT_KEY,
            {
            expiresIn: '1h'
            }
        );
        //guardar en cookie
        res.send({user});
    }catch(error){
        res.status(401).send(error.message);
    }
});
app.post('/register', async (req, res) =>{
    const {username, password} = req.body
    try{
        const id = await userRepository.create({username, password});
        res.send({id});
    }catch(error){
        res.status(401).json(error.message);
    }
});
app.post('/logout', (req, res) =>{

});

app.get('/protected', (req, res) =>{
    
});
app.listen(PORT, ( ) => {
    console.log(`Server listening on port ${PORT}`);
})





