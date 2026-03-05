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

    const pipeline = new CodePipeline(this, `pipeline-${props.envDeploy}`, {
      pipelineName: `pipeline-${props.envDeploy}`,
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.gitHub(this.repoName, this.repoBranch),
        commands: [
          'npm ci',
          'npx cdk synth'
        ],
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
          'npm ci',
          'npm test'
        ]
      }))
    }
  }
}
