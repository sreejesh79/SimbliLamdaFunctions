import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'download',
        cors: true,
        request: {
          parameters: {
            'querystrings': {
              'key': true
            },
          },
        },
      },
    },
  ],
};
