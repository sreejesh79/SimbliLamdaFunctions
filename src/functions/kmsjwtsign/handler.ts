import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { sign } from './sign';

import schema from './schema';

const handler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
      
    const token: string = await sign(event);
    return formatJSONResponse({
        // message: `Hello ${event.body.name}, welcome to the exciting Serverless world!`,
        token
    });
};

export const main = middyfy(handler);
