export default function errorHandler(error, req, res, next) {
  console.error("Error:", error);

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
