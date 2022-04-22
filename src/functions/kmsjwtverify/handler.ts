import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { verify } from './verify';


const handler: ValidatedEventAPIGatewayProxyEvent<any> = async (event) => {
      
   // const publicKey = `./.keys/` //'./.keys/Publickey-98b24899-c41f-4a27-9bbc-962ad513e50e.pem';
    const decoded: any =  await verify(event);
    console.log('decoded',decoded);
    return formatJSONResponse({
        // message: `Hello ${event.body.name}, welcome to the exciting Serverless world!`,
        decoded
    });
};

export const main = middyfy(handler);
