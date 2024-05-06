import express from "express";
import bodyParser from "body-parser";
import serverConfig from "./config/serverConfig";
import apiRouter from "./routes";
// import sampleProducer from "./producers/sampleProducer";
// import sampleWorker from "./workers/sampleWorker";

const server = express();

server.use(bodyParser.text());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.use("/api", apiRouter);
server.listen(serverConfig.PORT, function () {
  console.log("Server is up and running at ", serverConfig.PORT);
  // sampleWorker("SampleQueue");

  // sampleProducer("sampleJob", {
  //   name: "Sameer singh",
  //   age: "23",
  //   company: "PlaySimple Games",
  // });
});
