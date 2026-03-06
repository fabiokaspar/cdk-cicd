#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib/core';
import { CdkCicdStack } from '../lib/cdk-cicd-stack';
import dotenv from "dotenv"

export type TEnvDeployAWS = "development" | "prod"

dotenv.config()

// const env = process.env.NODE_ENV ?? "development"
const env = process.env.NODE_ENV ?? "prod"
dotenv.config({ path: `.env.${env}`, override: true })
// dotenv.config({ path: `.env.${env}.local`, override: true })

const app = new cdk.App();
new CdkCicdStack(app, `CdkCicdStack${env}`, {
    envDeploy: env as TEnvDeployAWS
});

app.synth()
