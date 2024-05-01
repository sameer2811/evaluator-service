import { Job } from "bullmq";
export default interface IoJob {
  name: String;
  payLoad: Record<string, unknown>;
  handler: (job?: Job) => void;
  failure: (job?: Job) => void;
}
