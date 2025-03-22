import { Router } from 'express';
import express from 'express';
import { SERVER_WEB } from '../config.js'
import path from 'node:path';

export const frontServer = Router();

frontServer.use(express.static(SERVER_WEB));

frontServer.get('/:page?', (req, res) =>{
    let page = req.params.page || 'index';
    const filePath = path.join(SERVER_WEB,  `${page}.html`);
    res.sendFile(filePath, (err)=>{
        if(err){
            res.sendFile(SERVER_WEB,  `${page}.html`);
        }
    });
});

