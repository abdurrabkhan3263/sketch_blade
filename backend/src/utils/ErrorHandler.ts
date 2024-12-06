import { Error } from "../types";

export default class ErrorHandler extends Error {
  statusCode: number;
  stack?: string | undefined;

  constructor({ statusCode, message = "Something went wrong" }: Error) {
    super(message);
    this.statusCode = statusCode;
    this.stack = new Error().stack;
  }
}
