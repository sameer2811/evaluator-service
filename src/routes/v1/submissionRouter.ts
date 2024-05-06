import express from "express";
import { checkDtoValidation } from "../../validators/validator";
import { createSubmissionDto } from "../../dto/createDtoSubmission";
import pingCheck from "../../controller/";

const submissionRouter = express.Router();

submissionRouter.post(
  "/",
  checkDtoValidation(createSubmissionDto),
  pingCheck.createSubmissionController
);

export default submissionRouter;
