import * as crytoJs from "crypto-js"

class crytoHepler {

    /**
     * ma hoa password
     * @param {string} password
     * @returns {CryptoJS.WordArray}
     */
    public encrytoPassword(password:string){
        return crytoJs.SHA256(password)
    }
}

const CrytoHepler = new crytoHepler()

export {CrytoHepler}