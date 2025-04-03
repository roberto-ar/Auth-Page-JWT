import express from 'express';
import { PORT, SERVER_WEB } from './config.js';
import cookieParser from 'cookie-parser';
import { createAuthController } from './routes/authRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

export const runApp = ({authModel}) => {
    const app = express();
    app.disable("x-powered-by");
    
    app.use(express.json());
    app.use(cookieParser());
    app.use(express.static(SERVER_WEB, {index : false}));
    app.use(createAuthController({authModel, SERVER_WEB}));
    app.use(errorHandler);
    app.listen(PORT, ( ) => {
        console.log(`Server listening on port ${PORT}`);
    })
    
}
