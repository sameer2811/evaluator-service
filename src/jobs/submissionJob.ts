import { Job } from "bullmq";
import IoJob from "../types/jobDescription";
import { CPP_LANGUAGE } from "../util/constants";
import runCppDocker from "../container/runCppDocker";
import { SubmissionPayload } from "../types/submissionPayload";

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
    if (this.payLoad[key].language === CPP_LANGUAGE) {
      const response = await runCppDocker(
        this.payLoad[key].code,
        this.payLoad[key].testCase
      );
      console.log("Evaluated response is ", response);
    }
  };

  failure = function failure(job?: Job) {
    console.log("Failed the Job ", job);
  };
}
