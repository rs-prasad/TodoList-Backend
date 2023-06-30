const CustomAPIError = require("../errors/customAPIError");

const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    res.status(err.statusCode).json({ msg: err.message });
  }
  console.log(err);
  return res.status(500).json({ msg: err });
};

module.exports = errorHandler;
