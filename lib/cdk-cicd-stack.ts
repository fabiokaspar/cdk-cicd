import * as cdk from 'aws-cdk-lib/core';
import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';
import { Construct } from 'constructs';

export class CdkCicdStack extends cdk.Stack {
  private readonly repoName: string = 'fabiokaspar/cdk-cicd'
  private readonly repoBranch: string = 'development'

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new CodePipeline(this, 'MyPipeline', {
      pipelineName: 'MyPipeline',
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.gitHub(this.repoName, this.repoBranch),
        commands: [
          'npm ci',
          'npx cdk synth'
        ],
        primaryOutputDirectory: 'cdk-cicd/cdk.out'
      })
    })
  }
}
