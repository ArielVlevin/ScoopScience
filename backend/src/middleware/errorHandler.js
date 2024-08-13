export default function errorHandler(error, req, res, next) {
  console.error("Error handler:\nCatched error:", error);

  if (error.message === "Email is already in use") {
    return res.status(409).json({ message: error.message });
  }

  if (error.message === "Username is already in use") {
    return res.status(409).json({ message: error.message });
  }

  if (error.message === "We cannot find an account with that email address") {
    return res
      .status(404)
      .json({ message: "User Not Found", details: error.message });
  }

  if (error.message === "Your password is incorrect") {
    return res
      .status(401)
      .json({ message: "Authentication Failed", details: error.message });
  }

  if (error.name === "ValidationError") {
    return res
      .status(400)
      .json({ message: "Validation Error", details: error.errors });
  }
  if (error.code === 11000) {
    return res
      .status(409)
      .json({ message: "Duplicate Key Error", details: error.keyValue });
  }
  if (error instanceof TypeError) {
    return res
      .status(400)
      .json({ message: "Type Error", details: error.message });
  }
  if (error.name === "CastError") {
    return res
      .status(400)
      .json({ message: "Cast Error", details: error.message });
  }
  if (error.name === "MongoNetworkError") {
    return res
      .status(500)
      .json({ message: "Database Connection Error", details: error.message });
  }
  if (error.name === "DocumentNotFoundError") {
    return res
      .status(404)
      .json({ message: "Document Not Found", details: error.message });
  }
  if (error.name === "MulterError") {
    return res
      .status(400)
      .json({ message: "Multer Error", details: error.message });
  }
  if (error.name === "SyntaxError") {
    return res
      .status(400)
      .json({ message: "JSON Syntax Error", details: error.message });
  }

  res
    .status(500)
    .json({ message: "Internal Server Error", details: error.message });
}
