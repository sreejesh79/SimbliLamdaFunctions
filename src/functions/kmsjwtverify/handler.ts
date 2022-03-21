import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { verify } from './verify';


const handler: ValidatedEventAPIGatewayProxyEvent<any> = async (event) => {
      
    const publicKey = './public.pem';
    const decoded: any =  await verify(event.headers.token, publicKey);
    console.log('decoded',decoded);
    return formatJSONResponse({
        // message: `Hello ${event.body.name}, welcome to the exciting Serverless world!`,
        decoded
    });
};

export const main = middyfy(handler);
