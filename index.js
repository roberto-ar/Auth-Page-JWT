import express from 'express';
import { PORT } from './config.js';

const app = express();

app.post('/login', (req, res) =>{
    res.send("hola login")
});
app.post('/register', (req, res) =>{});
app.post('/logout', (req, res) =>{});

app.get('/protected', (req, res) =>{});
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})





