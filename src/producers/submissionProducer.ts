import submissionQueue from "../queues/submissionQueue";

export default async function addsubmissionProducer(
  jobName: string,
  jobdata: Record<string, unknown>
) {
  await submissionQueue.add(jobName, jobdata);
}
