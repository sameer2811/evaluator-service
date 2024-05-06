import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";

export function checkPingWorking(_: Request, res: Response) {
  return res.status(StatusCodes.OK).json({
    msg: "Ping Controller is Up and Working",
    success: true,
    error: {},
  });
}
