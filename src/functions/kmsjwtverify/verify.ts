import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';

export const verify = async (event) => {
    const token = event.headers['token'];
    const keyId = event.headers['x-key-id'];
    const publicKey = `./.keys/Publickey-${keyId}.pem`;
    let cert =  fs.readFileSync(publicKey);
    try {
        const decoded = await jwt.verify(token, cert);
        return JSON.stringify(decoded);
    } catch (err) {
        return err.message;
    }
    
}