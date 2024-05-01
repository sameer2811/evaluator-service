import { Job } from "bullmq";
import IoJob from "../types/jobDescription";

export default class SampleJob implements IoJob {
  name: String;
  payLoad: Record<string, unknown>;
  constructor(payLoad: Record<string, unknown>) {
    this.name = this.constructor.name;
    this.payLoad = payLoad;
  }
  handler = (job?: Job): void => {
    console.log("Reaching here the code for the sample job ", this.payLoad);
    if (job) {
    }
  };
  failure = function (job?: Job): void {
    console.log("Job failed");
    if (job) {
    }
  };
}
