import { Queue } from "bullmq";
import { EVALUATION_QUEUE } from "../util/constants";
import redisConnection from "../config/redis.config";

export default new Queue(EVALUATION_QUEUE, {
  connection: redisConnection,
});
