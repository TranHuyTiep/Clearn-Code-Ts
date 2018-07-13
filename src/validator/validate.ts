const { checkSchema  } = require('express-validator/check');
import {Request} from "express";

class validator {
    public validateSignUp () {
        var schema =  checkSchema({
            // email: {
            //     isEmail:{
            //         options:true,
            //         errorMessage: 'Email không hợp lệ',
            //     },
            //     custom: {
            //         options: function(value:string, req: Request){
            //             console.log(req);
            //         }
            //     }
            // },
            newPassword: {
                isLength: {
                    errorMessage: 'Password phải có độ dài lớn hon 7 ký tự',
                    options: { min: 7 }
                },
                // matches:{
                //     options:' /^(?=.*[A-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@])(?!.*[iIoO])\\S{6,12}$/',
                //     errorMessage:`Password phai co đô dài từ 6-12 ký tự, ít nhất 1 ký tự thường hoặc 1 ký tự hoa,
                //                 ký tự số`
                // },

            },
            password: {
                equals : {
                    options : 'newPassword',
                    errorMessage: 'Password không khớp vui lòng nhập lại',
                }
            },
        });
        return schema;
    }
}

const Validator = new validator();
export {Validator} ;

