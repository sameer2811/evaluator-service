import express from "express";
import pingCheck from "../../controller/";
import submissionRouter from "./submissionRouter";

const v1Router = express.Router();

v1Router.get("/", pingCheck.checkPingWorking);

v1Router.use("/submissions", submissionRouter);
export default v1Router;
