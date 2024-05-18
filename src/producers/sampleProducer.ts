import sampleQueue from "../queues/sampleQueue";

export async function addSampleProducer(
  jobName: string,
  jobdata: Record<string, unknown>
) {
  await sampleQueue.add(jobName, jobdata);
  console.log("job name and job data is registered ", jobName, jobdata);
}
