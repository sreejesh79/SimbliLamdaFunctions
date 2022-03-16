import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';

export const verify = async (token, publicKey) => {
    let cert =  fs.readFileSync(publicKey);
    try {
        const decoded = await jwt.verify(token, cert);
        return JSON.stringify(decoded);
    } catch (err) {
        return err.message;
    }
    
}