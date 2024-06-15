const addUserIdToReq = (req, res, next) => {
  const { userId } = req.params;

  if (userId) req.userId = userId;
  next();
};

module.exports = addUserIdToReq;
