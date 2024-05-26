import { Job } from "bullmq";
import IoJob from "../types/jobDescription";
import { CPP_LANGUAGE } from "../util/constants";
import runCppDocker from "../container/runCppDocker";

export default class SubmissionJob implements IoJob {
  name: string;
  payLoad: Record<string, string>;
  constructor(payLoad: Record<string, string>) {
    this.name = this.constructor.name;
    this.payLoad = payLoad;
  }

  handler = async () => {
    console.log(this.payLoad);
    if (this.payLoad.language === CPP_LANGUAGE) {
      const response = await runCppDocker(
        this.payLoad.code,
        this.payLoad.testCase
      );
      console.log("Evaluated response is ", response);
    }
  };

  failure = function failure(job?: Job) {
    console.log("Failed the Job ", job);
  };
}
