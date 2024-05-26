import express from "express";
import bodyParser from "body-parser";
import serverConfig from "./config/serverConfig";
import apiRouter from "./routes";
import runPythonDocker from "./container/runPythonDocker";
// import { addSampleProducer } from "./producers/sampleProducer";
// import { sampleQueueWorker } from "./workers/sampleWorker";
const server = express();

server.use(bodyParser.text());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.use("/api", apiRouter);
server.listen(serverConfig.PORT, function () {
  console.log("Server is up and running at ", serverConfig.PORT);

  let pythonCode = `x = input()
y = input()
print("Value of x is", x)
print("Value of y is", y)
  `;
  let testCase = `100
  200`;
  runPythonDocker(pythonCode, testCase);
  // Registering Sample Queue
  // sampleQueueWorker("SampleQueue");

  // Addition in sample Producer
  // addSampleProducer("sampleJob", {
  //   name: "Sameer singh",
  //   age: "23",
  //   company: "PlaySimple Games",
  // });
});
