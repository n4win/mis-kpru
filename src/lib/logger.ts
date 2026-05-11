import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

const { combine, timestamp, json, colorize, printf } = winston.format;

const isDev = process.env.NODE_ENV === "development";

export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: combine(timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), json()),
  transports: [
    new winston.transports.Console({
      format: isDev
        ? combine(
            colorize({ all: true }),
            printf(
              ({ level, message, timestamp }) =>
                `[${timestamp}] ${level}: ${message}`,
            ),
          )
        : json(),
    }),
    new DailyRotateFile({
      filename: "logs/%DATE%.log",
      datePattern: "YYYY-MM-DD",
      maxFiles: "30d",
      auditFile: "logs/.audit.json", // รวม audit ไว้ไฟล์เดียว
    }),
  ],
});
