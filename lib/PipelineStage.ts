import { Stage, StageProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { LambdaStack } from "./LambdaStack";

interface PipelineStageProps extends StageProps {
    envDeploy: string
}

export class PipelineStage extends Stage {

    //props are required for stages
    constructor(scope: Construct, id: string, props: PipelineStageProps) {
        super(scope, id, props)

        new LambdaStack(this ,'LambdaStack', {
            envDeploy: props.envDeploy
        })
    }
}