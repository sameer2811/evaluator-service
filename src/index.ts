import express from "express";
import bodyParser from "body-parser";
import serverConfig from "./config/serverConfig";
import apiRouter from "./routes";
import { SUBMISSION_QUEUE } from "./util/constants";
import initalizeSubmissionWorker from "./workers/submissionWorker";
const server = express();

server.use(bodyParser.text());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.use("/api", apiRouter);
server.listen(serverConfig.PORT, function () {
  console.log("Server is up and running at ", serverConfig.PORT);
  // Initializing the submission worker
  initalizeSubmissionWorker(SUBMISSION_QUEUE);
});
