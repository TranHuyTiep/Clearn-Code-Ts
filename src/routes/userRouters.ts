import {Router} from "express";
import {User} from "../controller/userController";
import {Validator} from '../validator/validate'
export class router{
    router : Router;

    constructor(){
        this.router = Router();
        this.init();
    };

    init(){
        this.router.route('/users/login')
            .get(User.renderUserLoginPage)
            .post(User.handleUserLogin);

        this.router.route('/users/dang-ky')
            .get(User.renderUserSingUpPage)
            .post(User.handleUserSignUp);

        this.router.route('/users')
            .get(User.getAllUser)
            .post(User.createUser);

        this.router.route('/users/:userId')
            .get(User.getUser)
            .put(User.updateUser)
            .delete(User.deleteUser)
    };

};

const UserRouter = new router();

export default UserRouter.router

