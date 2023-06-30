const notFoundPage = async (req, res) => {
  res.status(404).send("This route doesn't exist.");
};

module.exports = { notFoundPage };
