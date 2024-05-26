import IoJob from "../types/jobDescription";

export default class SampleJob implements IoJob {
  name: String;
  payLoad: Record<string, string>;
  constructor(payLoad: Record<string, string>) {
    this.name = this.constructor.name;
    this.payLoad = payLoad;
  }
  handler = (): void => {
    console.log("Reaching here the code for the sample job ", this.payLoad);
  };
  failure = function (): void {};
}
