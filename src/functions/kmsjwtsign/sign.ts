import * as AWS from 'aws-sdk';
import base64url from "base64url";
const kms = new AWS.KMS();
var format = require('ecdsa-sig-formatter');

//const keyId = process.env.KMS_KEY_ID;

const headers = {
    "alg": "ES256",
    "typ": "JWT"
  }

export const sign = async (event) => {
    const payload = event.body;
    const eventHeaders = event.headers;
    const keyId = eventHeaders['x-key-id'];
    payload.iat = Math.floor(Date.now() / 1000);
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    // payload.exp = Math.floor(tomorrow.getTime() / 1000);
    const expiry = new Date(Date.now() + 60*5000);
    payload.exp = Math.floor(expiry.getTime() / 1000);
    let token_components: any = {
        header: base64url(JSON.stringify(headers)),
        payload: base64url(JSON.stringify(payload)),
    };

    let message = Buffer.from(token_components.header + "." + token_components.payload)

    let res = await kms.sign({
        Message: message,
        KeyId: keyId,
        SigningAlgorithm: 'ECDSA_SHA_256',
        MessageType: 'RAW'
    }).promise()
    token_components.signature = res.Signature.toString("base64")
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
    return token_components.header + "." + token_components.payload + "." + format.derToJose(res.Signature, 'ES256');
}
