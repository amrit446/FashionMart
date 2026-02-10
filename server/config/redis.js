// config/redis.js
import { createClient } from "redis";

const redisClient = createClient({
  username: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: 'redis-18232.crce263.ap-south-1-1.ec2.cloud.redislabs.com',
    port: 18232,
  },
});
console.log(process.env.REDIS_PORT, "process.env.REDIS_PORT", process.env.REDIS_USERNAME)
// Events
redisClient.on("connect", () => {
  console.log("✅ Redis Cloud Connected");
});

redisClient.on("error", (err) => {
  console.error("❌ Redis Client Error:", err);
});

// Connect function
export const connectRedis = async () => {
  if (!redisClient.isOpen) {
    await redisClient.connect();
  }
};

export default redisClient;
