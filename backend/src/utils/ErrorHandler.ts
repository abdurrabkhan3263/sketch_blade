import { Error as ErrorType } from "../types/appType";

export default class ErrorHandler extends Error {
  statusCode: number;
  stack?: string | undefined;

  constructor({ statusCode, message = "Something went wrong" }: ErrorType) {
    super(message);
    this.statusCode = statusCode;
    this.stack = new Error().stack;
  }
}
