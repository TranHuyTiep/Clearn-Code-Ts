import * as mysql from "mysql";
let config = require('../../config.json');

class connectMysql {
    pool : mysql.Pool;

    constructor(){
        this.pool =  mysql.createPool(config.db);
    };

    /**
     * get connection
     * @returns {Promise<object>}
     */
    public getConnect(): Promise<object> {
        const promise = new Promise((resolve, reject) => {
            this.pool.getConnection(function (err, connection) {
                if (err){
                    console.error(err);
                    reject(err)
                }else {
                    resolve(connection);
                }
            });
        });

        return promise;
    };

    /**
     * query sql
     * @param {string} sql
     * @param data
     * @returns {Promise<object>}
     */
    public querySql(sql: string, data ?: any) : Promise<object>{
        const promise = new Promise(((resolve, reject) =>  {
            this.getConnect()
                .then(function (connection: any) {
                    connection.query(sql,data, function (error:Error, results:any) {
                        if (error){
                            connection.destroy();
                            reject(error);
                        };

                        resolve(results);
                        connection.destroy();
                    });
                })
                .catch(function (error: Error) {
                    reject(error);
                });
        }));

        return promise;
    };
};

const ConnectMysql = new connectMysql();

export {ConnectMysql}