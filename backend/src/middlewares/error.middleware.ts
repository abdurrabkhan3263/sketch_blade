import express from "express";

const ErrorHandler = (
  err: any,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const errStatus = err.status || 500;
  const errMsg = err.message || "Something went wrong";

  console.log(err.stack);

  res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMsg,
    stack: process.env.NODE_ENV === "development" ? err.stack : {},
  });
};

export default ErrorHandler;
