import {handler} from './index';
import { APIGatewayEvent, Context, Callback } from 'aws-lambda';

const event: APIGatewayEvent = {
  body: JSON.stringify({
    username: 'pippo',
    password: 'pippo',
  }),
  headers: {},
  multiValueHeaders: {},
  httpMethod: 'POST',
  isBase64Encoded: false,
  path: '/login',
  pathParameters: null,
  queryStringParameters: null,
  multiValueQueryStringParameters: null,
  stageVariables: null,
  requestContext: {
    accountId: '',
    apiId: '',
    authorizer: {},
    protocol: '',
    httpMethod: '',
    identity: {
      accessKey: null,
      accountId: null,
      apiKey: null,
      apiKeyId: null,
      caller: null,
      clientCert: null,
      cognitoAuthenticationProvider: null,
      cognitoAuthenticationType: null,
      cognitoIdentityId: null,
      cognitoIdentityPoolId: null,
      principalOrgId: null,
      sourceIp: '',
      user: null,
      userAgent: null,
      userArn: null,
    },
    path: '',
    stage: '',
    requestId: '',
    requestTimeEpoch: 0,
    resourceId: '',
    resourcePath: '',
  },
  resource: '',
};

const context: Context = {
    callbackWaitsForEmptyEventLoop: false,
    functionName: '',
    functionVersion: '',
    invokedFunctionArn: '',
    memoryLimitInMB: '128',
    awsRequestId: '',
    logGroupName: '',
    logStreamName: '',
    getRemainingTimeInMillis: () => 1000,
    done: () => {},
    fail: (error: Error | string) => {},
    succeed: (messageOrObject: any) => {},
  };

  const callback: Callback = (error, result) => {
    if (error) {
      console.error('Error:', error);
    } else {
      console.log('Result:', result);
    }
  };


(async () => {
    const response = await handler({}, context, callback);
    console.log('Response:', response);
  })();