import type { AWS } from '@serverless/typescript';

import sign from '@functions/kmsjwtsign';
import verify from '@functions/kmsjwtverify';
import upload from '@functions/signedurlupload';
import download from '@functions/signedurldownload';
import mail from '@functions/sessendmail';


const serverlessConfiguration: AWS = {
  org: 'simbliserverless',
  app: 'simblifylamda',
  service: 'simblifylamdaservice',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild', 'serverless-offline', 'serverless-dotenv-plugin'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    region: 'ap-south-1',
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: [
          "kms:Decrypt",
          "kms:Encrypt",
          "kms:Sign",
          "kms:Verify",
          "kms:CreateGrant",
          's3:PutObject',
          's3:PutObjectAcl',
          's3:GetObject',
          's3:GetObjectAcl',
          "ses:SendEmail",
          "ses:SendRawEmail"
        ],
        Resource: {
          "Fn::Join": ['arn:aws:s3:::dev-simblistorage', '*']
        }
      }
    ],
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
  },
  // import the function via paths
  functions: { sign, verify, upload, download, mail },
  package: { 
    individually: true,
    include: ['.keys/**']
  },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    }
  },
};

module.exports = serverlessConfiguration;
