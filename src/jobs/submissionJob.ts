import { Job } from "bullmq";
import IoJob from "../types/jobDescription";
import { SubmissionPayload } from "../types/submissionPayload";
import createExecutor from "../util/createExecutor";
import {
  CodeExecutorStrategy,
  ExecutionResponse,
} from "../types/codeExecutorStrategy";

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

    const strategey: CodeExecutorStrategy | null = createExecutor(language);
    if (strategey != null) {
      const response: ExecutionResponse = await strategey.execute(
        code,
        inputTestCase,
        outputTestCase
      );
      if (response.status === "COMPLETED") {
        console.log("code is executed Successfully");
        console.log(response.output);
      } else {
        console.log("Something went wrong with the code execution");
        console.log(response.output);
      }
    }
  };

  failure = function failure(job?: Job) {
    console.log("Failed the Job ", job);
  };
}
