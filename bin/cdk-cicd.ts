#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib/core';
import { CdkCicdStack } from '../lib/cdk-cicd-stack';

const app = new cdk.App();
new CdkCicdStack(app, 'CdkCicdStackDev', {
    envDeploy: 'development'
});
new CdkCicdStack(app, 'CdkCicdStackProd', {
    envDeploy: 'prod'
});

app.synth()