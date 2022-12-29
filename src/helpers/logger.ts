import winston from "winston";
import { LoggingWinston } from "@google-cloud/logging-winston";
import { Logger } from "~/types/interfaces/logger";

const createLogger = (): Logger => {
  const logger = winston.createLogger({
    format: winston.format.combine(
      winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
      winston.format.json()
    ),
    transports: [
      ...(process.env.NODE_ENV !== "development"
        ? [new LoggingWinston()]
        : [new winston.transports.Console()]),
    ],
  });

  return {
    debug: (message: string, payload?: Record<string, unknown>) =>
      logger.debug(message, payload),
    info: (message: string, payload?: Record<string, unknown>) =>
      logger.info(message, payload),
    warn: (message: string, payload?: Record<string, unknown>) =>
      logger.warn(message, payload),
    error: (message: string, payload?: Record<string, unknown>) =>
      logger.error(message, payload),
  };
};

export const logger = createLogger();
