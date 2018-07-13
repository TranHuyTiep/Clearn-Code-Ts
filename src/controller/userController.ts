import {Request,Response,NextFunction} from "express";
import * as createError from 'http-errors';
import {userModel} from "../models/userModel";
import {CrytoHepler} from "../help/encryto";
const { validationResult } = require('express-validator/check');

interface UserInterface {
    email: string,
    password: string,
    createDate: number,
}

export class user{

    /**
     * load page login
     * @param {e.Request} req
     * @param {e.Response} res
     * @param {e.NextFunction} next
     */
    public renderUserLoginPage (req: Request,res: Response, next : NextFunction){
        res.render('user/login')
    };

    /**
     * xu ly dnag nhap
     * @param {e.Request} req
     * @param {e.Response} res
     * @param {e.NextFunction} next
     */

    public handleUserLogin (req:Request, res:Response, next : NextFunction){
        let params = req.body;
        let password = CrytoHepler.encrytoPassword(params.password);
        let conditionGetUser = `email = '${params.email}'`;

        userModel.getUser(conditionGetUser)
            .then(function (user: any) {
                if(user.length > 0 && user[0].password == password){
                    res.render('user/index',{name:user[0].email})
                }else {
                    let error = createError(400, 'UserModel chưa tồn tại hoặc sai mật khẩu')
                    res.render('error',{error:error})
                }
            })

    };

    /**
     *
     * @param {e.Request} req
     * @param {e.Response} res
     * @param {e.NextFunction} next
     */
    public renderUserSingUpPage (req:Request,res:Response, next : NextFunction){
        res.render('user/sign-up')
    };

    /**
     *
     * @param {e.Request} req
     * @param {e.Response} res
     * @param {e.NextFunction} next
     */
    public async handleUserSignUp (req:Request,res:Response, next : NextFunction){
        let params = req.body;
        let date = new Date();
        const errors = validationResult(req);

        if(errors.isEmpty()){
            let dataInsert = {
                email: params.email,
                password : CrytoHepler.encrytoPassword(params.password),
                createDate: date.getTime()
            };
            let conditionGetUser = `email = '${params.email}'`;
            let user = await userModel.getUser(conditionGetUser);

            if(user.length == 0){
               userModel.insertUser(dataInsert)
                   .then(function (resolve) {
                      res.json(true)
                   });

            }else {
                res.json(true);
            };
        }else {
            console.log(validationResult(req).array())
            let error =  createError(500)
            res.status(error.status).json(error)
        };
    };

    /**
     * get All user
     * @param {e.Request} req
     * @param {e.Response} res
     * @param {e.NextFunction} next
     * @returns {Promise<void>}
     */
    public async getAllUser(req: Request,res: Response, next : NextFunction){
        try {
            let users:Array<object> = await userModel.getUser();
            res.send(users);
        }catch (e) {
            res.status(500);
        };
    };

    /**
     * get user
     * @param {e.Request} req
     * @param {e.Response} res
     * @param {e.NextFunction} next
     * @returns {Promise<void>}
     */
    public async getUser(req: Request,res: Response, next : NextFunction){
        let userId: string =  req.params.userId;
        let conditionSql: string = `userId = ${userId}`;

        try {
            let user: Array<object> = await userModel.getUser(conditionSql);
            res.send(user);
        }catch (e) {
            res.status(500);
        };
    };

    /**
     * update user
     * @param {e.Request} req
     * @param {e.Response} res
     * @param {e.NextFunction} next
     * @returns {Promise<void>}
     */
    public async updateUser(req: Request,res: Response, next : NextFunction){
        let userUpdate =  req.body;
        let conditionSql: string = `userId = ${userUpdate.userId}`;
        let user: Array<object> = await userModel.getUser(conditionSql);

        if(user.length > 0){
            userModel.updateUser([userUpdate,userUpdate.userId])
                .then(function (resolve) {
                    res.status(200).send('Update User');
                });
        }else {
            res.status(400).send('User khong ton tai');
        };
    };

    /**
     * delete user
     * @param {e.Request} req
     * @param {e.Response} res
     * @param {e.NextFunction} next
     * @returns {Promise<void>}
     */
    public async deleteUser(req: Request, res: Response, next: NextFunction){
        let userId =  req.params.userId;
        let conditionSql: string = `userId = ${userId}`;

        try {
            let user: Array<object> = await userModel.getUser(conditionSql);

            if(user.length > 0){
                await userModel.deleteUser(userId)
                res.status(200).send('Delete User');

            }else {
                res.status(400).send('User khong ton tai');
            };
        }catch (e) {
            res.status(500)
            console.error(e)
        };
    };

    /**
     * Tao moi use
     * @param {e.Request} req
     * @param {e.Response} res
     * @param {e.NextFunction} next
     * @returns {Promise<void>}
     */
    public async createUser(req: Request,res: Response, next : NextFunction){
        let params: UserInterface = req.body;
        let date = new Date();
        let dataInsert: UserInterface = {
            email: params.email,
            password : CrytoHepler.encrytoPassword(params.password).toString(),
            createDate: date.getTime()
        };
        let conditionGetUser = `email = '${params.email}'`;
        let user: Array<object> = await userModel.getUser(conditionGetUser);

        if(user.length == 0){
            userModel.insertUser(dataInsert)
                .then(function (resolve) {
                    res.status(200).send('Created User')
                });

        }else {
            res.status(400).json('User da ton tai');
        };
    };
}

const User = new user();

export {User}


