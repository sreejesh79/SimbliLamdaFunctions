import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { upload } from './upload';

import schema from './schema';

const handler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
      
    const url: string = await upload(event.body);
    return formatJSONResponse({
        // message: `Hello ${event.body.name}, welcome to the exciting Serverless world!`,
        url
    });
};

export const main = middyfy(handler);
