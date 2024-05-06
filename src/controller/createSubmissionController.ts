import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { createSubmissionDtoType } from "../dto/createDtoSubmission";

export function createSubmissionController(req: Request, res: Response) {
  const submissionDtoRes = req.body as createSubmissionDtoType;
  // TODO :- Check Zod Validation here;

  return res.status(StatusCodes.OK).json({
    msg: "Everything is right in the schema",
    success: true,
    error: {},
    response: submissionDtoRes,
  });
}
