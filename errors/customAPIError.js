class CustomAPIError extends Error {
  constructor(msg, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

module.exports = CustomAPIError;
