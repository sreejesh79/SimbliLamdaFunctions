import * as AWS from 'aws-sdk';
const ses = new AWS.SES();

export const sendmail = async (payload) => {
    try {
        // console.log(payload.params);
        const parsedParams: any = JSON.parse(payload.params);
        const emailResponse: any = await ses.sendEmail(parsedParams).promise();
        if (emailResponse && emailResponse.MessageId) {
            return {
                "error" : false,
                "status": 200,
                "data": emailResponse
            }
        } else {
            return {
                "error" : true,
                "status": 501,
                "data": emailResponse
            }
        }
        return emailResponse;
       // return 'mail send success';
    } catch (e) {
        return {
            "error" : true,
            "status": 501,
            "message": e.message
        }
    }
}
