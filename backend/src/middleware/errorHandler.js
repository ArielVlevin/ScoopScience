function sendErrorResponse(res, statusCode, message, details) {
  return res.status(statusCode).json({ message, details });
}

export default function errorHandler(error, req, res, next) {
  console.error("Error handler:\nCatched error:", error);

  if (
    error.message === "Email is already in use" ||
    error.message === "Username is already in use"
  ) {
    return sendErrorResponse(res, 409, error.message);
  }

  if (error.message === "We cannot find an account with that email address") {
    return sendErrorResponse(res, 404, "User Not Found", error.message);
  }

  if (error.message === "Your password is incorrect") {
    return sendErrorResponse(res, 401, "Authentication Failed", error.message);
  }

  if (error.name === "ValidationError") {
    return sendErrorResponse(res, 400, "Validation Error", error.errors);
  }

  if (error.code === 11000) {
    return sendErrorResponse(res, 409, "Duplicate Key Error", error.keyValue);
  }

  if (error instanceof TypeError) {
    return sendErrorResponse(res, 400, "Type Error", error.message);
  }

  if (error.name === "CastError") {
    return sendErrorResponse(res, 400, "Cast Error", error.message);
  }

  if (error.name === "MongoNetworkError") {
    return sendErrorResponse(
      res,
      500,
      "Database Connection Error",
      error.message
    );
  }

  if (error.name === "DocumentNotFoundError") {
    return sendErrorResponse(res, 404, "Document Not Found", error.message);
  }

  if (error.name === "MulterError") {
    return sendErrorResponse(res, 400, "Multer Error", error.message);
  }

  if (error.name === "SyntaxError") {
    return sendErrorResponse(res, 400, "JSON Syntax Error", error.message);
  }

  return sendErrorResponse(res, 500, "Internal Server Error", error.message);
}
