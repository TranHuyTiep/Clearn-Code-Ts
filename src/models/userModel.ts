import {ConnectMysql} from "../config/dbConnect";

export class UserModel {
    /**
     * get data user
     * @param {string} condition
     * @returns {Promise<any>}
     */
    public getUser(condition ?: string) : Promise<any>{
        let Condition = condition || " 1";
        let sql: string = `SELECT * FROM user WHERE ${Condition}`;

        return ConnectMysql.querySql(sql);
    };

    /**
     * insert user
     * @param data
     * @returns {Promise<any>}
     */

    public async insertUser(data: Object): Promise<any>{
        let sqlResetIndex = `ALTER TABLE user AUTO_INCREMENT = 1`;
        let sqlInsert: string = `INSERT INTO user SET ? `;

        try {
            await ConnectMysql.querySql(sqlResetIndex);
            return await ConnectMysql.querySql(sqlInsert,data);
        }catch (e) {
            console.error(e);
        };

    };

    /**
     * update user
     * @param {Object} data
     * @returns {Promise<any>}
     */
    public updateUser(data: Object): Promise<any>{
        let sql = `UPDATE user SET ? WHERE userId = ?`;

        return ConnectMysql.querySql(sql, data);
    };


    /**
     * delete User
     * @param {string} data
     * @returns {Promise<any>}
     */
    public deleteUser(data: string): Promise<any>{
        let sql = `DELETE FROM user WHERE userId = ?`

        return ConnectMysql.querySql(sql, data);
    };
};

let userModel = new UserModel();

export {userModel}