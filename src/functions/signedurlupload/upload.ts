import * as AWS from 'aws-sdk';
import * as mime from 'mime-types';
const s3 = new AWS.S3();

const expiry = Number(process.env.SIGNED_URL_EXPIRY);


export const upload = async (payload) => {
   try {
    const bucketName = process.env.S3_BUCKET_NAME;
    const mimeType = mime.lookup(payload.key);
    const requestObj: any = {
        Bucket: bucketName,
        Key: payload.key,
        Expires: expiry,
        ContentType: mimeType
     };
     const url = await s3.getSignedUrlPromise("putObject", requestObj);
     return url;
   } catch (e) {
       return e.message;
   }
}