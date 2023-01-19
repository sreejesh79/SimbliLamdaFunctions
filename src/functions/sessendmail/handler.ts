import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { sendmail } from './sendmail';

import schema from './schema';

const handler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
      
    const response: string = await sendmail(event.body);
    return formatJSONResponse({
        // message: `Hello ${event.body.name}, welcome to the exciting Serverless world!`,
        response
    });
};

export const main = middyfy(handler);
