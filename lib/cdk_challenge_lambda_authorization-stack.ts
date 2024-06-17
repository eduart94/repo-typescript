import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { aws_lambda, aws_apigateway } from 'aws-cdk-lib';
import path from 'path';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class CdkChallengeLambdaAuthorizationStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Lambda function
    const lambdaFunctionAuthorization = new aws_lambda.Function(this, 'AuthorizationLambda', {
      runtime: aws_lambda.Runtime.NODEJS_20_X,
      functionName: 'authorizationlambda',
      handler: 'dist/index.handler',
      code: aws_lambda.Code.fromAsset(path.join(__dirname, '..', 'lambdaAuthorization'))
    })

    //API Gateway
    const apiGateway = new aws_apigateway.LambdaRestApi(this, 'AuthenticationLambdaRestApi', {
      handler: lambdaFunctionAuthorization,
      proxy: false
    })

    const resourceAuthorization = apiGateway.root.addResource('auth');
    resourceAuthorization.addMethod('POST');
  }
}
