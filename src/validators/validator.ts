import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { ZodSchema } from "zod";

export function checkDtoValidation(schema: ZodSchema<any>) {
  return function (req: Request, res: Response, next: NextFunction) {
    try {
      // if schema does not throws the error then going to the next function
      console.log("printing the req.body ", req.body);
      schema.parse({ ...req.body });
      next();
    } catch (error) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        sucess: false,
        msg: "Seems like data is not in correct way !!",
        error: error,
      });
    }
  };
}
