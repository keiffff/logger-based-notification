import { Request } from "express";
import { Logger } from "./logger";

export type Context = {
  req: Request;
  logger: Logger;
};
