import * as AWS from 'aws-sdk';
const s3 = new AWS.S3();

const expiry = Number(process.env.SIGNED_URL_EXPIRY);


export const upload = async (payload) => {
   try {
    const bucketName = process.env.S3_BUCKET_NAME;
    const requestObj: any = {
        Bucket: bucketName,
        Key: payload.key,
        Expires: expiry
     };
     const url = await s3.getSignedUrlPromise("putObject", requestObj);
     return url;
   } catch (e) {
       return e.message;
   }
}