import dotenv from "dotenv";

dotenv.config();

export default {
  PORT: process.env.PORT || 9000,
  REDIS_PORT: 6379,
  REDIS_LOCAL_HOST: "127.0.0.1",
};
