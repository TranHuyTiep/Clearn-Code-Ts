import * as path from 'path'
import * as express from 'express'
import * as logger  from 'morgan'
import * as bodyParser from 'body-parser'
import * as createError from 'http-errors'
import {Request,Response} from "express";

import userRouters from './routes/userRouters';

class App{

    public express : express.Application;

    constructor(){
        this.express = express();
        this.middleware();
        this.router()
    }

    private middleware(): void{
        this.express.use(logger('dev'));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({extended:false}));
        this.express.set("views", path.join(__dirname, "../views"));
        this.express.set("view engine", "ejs");
        this.express.use(express.static(path.join(__dirname, '../public')));
    }

    private router(): void{
        this.express.use('/api/v1', [userRouters]);

        this.express.use(function(req: Request, res: Response) {
            let err = (createError(404, ' Trang không tồn tại'));
            res.status(err.status).send(err.message);
        });

    }
}

export default new App().express;