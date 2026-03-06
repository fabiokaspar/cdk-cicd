import * as cdk from 'aws-cdk-lib/core';
import { CodeBuildStep, CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';
import { Construct } from 'constructs';
import { PipelineStage } from './PipelineStage';

interface CdkCicdStackProps extends cdk.StackProps {
  envDeploy: 'prod' | 'development'  
}

export class CdkCicdStack extends cdk.Stack {
  private readonly repoName: string = 'fabiokaspar/cdk-cicd'
  private repoBranch: string = 'development'

  constructor(scope: Construct, id: string, props: CdkCicdStackProps) {
    super(scope, id, props);

    if (props.envDeploy === 'prod') {
      this.repoBranch = 'main'
    }

    const buildEnv = {
      DB_PORT: process.env.DB_PORT || '',
      DB_HOST: process.env.DB_HOST || '',
      DB_NAME: process.env.DB_NAME || '',
      DB_USER: process.env.DB_USER || '',
      DB_PASSWORD: process.env.DB_PASSWORD || '',
      ENVIRONMENT: process.env.NODE_ENV || 'development'
    }

    const pipeline = new CodePipeline(this, `pipeline-${props.envDeploy}`, {
      pipelineName: `pipeline-${props.envDeploy}`,
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.gitHub(this.repoName, this.repoBranch),
        commands: [
          'echo DB_HOST=$DB_HOST',
          'node -e "console.log(process.env.DB_HOST)"',
          'npm ci',
          'npx cdk synth'
        ],
        env: buildEnv,
        primaryOutputDirectory: undefined
      })
    })

    const stage = pipeline.addStage(new PipelineStage(this, 'PipelineTestStage', {
      stageName: props.envDeploy !== 'prod' ? 'test' : 'deploy',
      envDeploy: props.envDeploy
    }))

    
    if (props.envDeploy !== 'prod') {
      stage.addPre(new CodeBuildStep('unit-tests', {
        commands: [
          'echo BEFORE_NPM=$DB_HOST',
          'npm ci',
          'echo AFTER_NPM=$DB_HOST',
          'npm test'
        ],
        env: buildEnv
      }))
    }
  }
}
