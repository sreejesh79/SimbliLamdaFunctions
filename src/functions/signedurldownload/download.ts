import * as AWS from 'aws-sdk';
const s3 = new AWS.S3();

const expiry = Number(process.env.SIGNED_URL_EXPIRY);


export const download = async (payload) => {
   try {
    const bucketName = process.env.S3_BUCKET_NAME;
    const requestObj: any = {
        Bucket: bucketName,
        Key: payload.key,
        Expires: expiry
     };
     const url = await s3.getSignedUrlPromise("getObject", requestObj);
     return url;
   } catch (e) {
       return e.message;
   }
}