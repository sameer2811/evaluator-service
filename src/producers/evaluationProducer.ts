import evaluationQueue from "../queues/evaluationQueue";

export default async function addEvaluationProducer(
  jobName: string,
  jobdata: Record<string, unknown>
) {
  await evaluationQueue.add(jobName, jobdata);
  console.log("Added the data in evaluation queue ", jobdata);
}
