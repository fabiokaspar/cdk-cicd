#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib/core';
import { CdkCicdStack } from '../lib/cdk-cicd-stack';
import dotenv from "dotenv"

dotenv.config()

const env = process.env.NODE_ENV
if (env === 'development' || env === 'prod') {
    dotenv.config({ path: `.env.${env}`, override: true })
    // dotenv.config({ path: `.env.${env}.local`, override: true })

    const app = new cdk.App();
    new CdkCicdStack(app, `CdkCicdStack${env}`, {
        envDeploy: env
    });
    app.synth()
}
