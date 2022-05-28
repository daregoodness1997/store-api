const notFound = async (req, res) =>
  res.status(404).send('Route does not exits');

module.exports = notFound;
