module.exports = (use) => {
  return function (req, res, next) {
    if (req.decodedToken.use && req.decodedToken.use.includes(use)) {
      next();
    } else {
      res.status(403).json({ message: "no bueno!" });
    }
  };
};
