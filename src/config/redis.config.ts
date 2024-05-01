import { Redis } from "ioredis";
import serverConfig from "./serverConfig";
const redisConfig = {
  port: serverConfig.REDIS_PORT,
  host: serverConfig.REDIS_LOCAL_HOST,
  maxRetriesPerRequest : null
};

const redisConnection = new Redis(redisConfig);

export default redisConnection;
