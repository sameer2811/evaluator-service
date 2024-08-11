import IoJob from "../types/jobDescription";
import { SubmissionPayload } from "../types/submissionPayload";
import createExecutor from "../util/createExecutor";
import {
  CodeExecutorStrategy,
  ExecutionResponse,
} from "../types/codeExecutorStrategy";

import { EVALUATION_JOB } from "../util/constants";
import addEvaluationProducer from "../producers/evaluationProducer";
export default class SubmissionJob implements IoJob {
  name: string;
  payLoad: Record<string, SubmissionPayload>;
  constructor(payLoad: Record<string, SubmissionPayload>) {
    this.name = this.constructor.name;
    this.payLoad = payLoad;
  }

  handler = async () => {
    console.log(this.payLoad);
    let key = Object.keys(this.payLoad)[0];
    let language = this.payLoad[key].language;
    let inputTestCase = this.payLoad[key].testCase;
    let outputTestCase = this.payLoad[key].outputCase;
    let code = this.payLoad[key].code;
    let userId = this.payLoad[key].userId;
    let submissionId = this.payLoad[key].submissionId;

    try {
      const strategy: CodeExecutorStrategy | null = createExecutor(language);
      if (strategy != null) {
        const response: ExecutionResponse = await strategy.execute(
          code,
          inputTestCase,
          outputTestCase
        );
        addEvaluationProducer(EVALUATION_JOB, {
          response: response,
          userId: userId,
          submissionId: submissionId,
        });
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };
}
