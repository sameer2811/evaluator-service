import express from "express";
import serverConfig from "./config/serverConfig";
import sampleProducer from "./producers/sampleProducer";
import sampleWorker from "./workers/sampleWorker";

const server = express();

server.listen(serverConfig.PORT, function () {
  console.log("Server is up and running at ", serverConfig.PORT);
  sampleWorker("SampleQueue");
  
  sampleProducer("sampleJob", {
    name: "Sameer singh",
    age: "23",
    company: "PlaySimple Games",
  });
});
