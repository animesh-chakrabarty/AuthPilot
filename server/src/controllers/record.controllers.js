const fetchRecords = (req, res) => {
  res.status(200).json({
    msg: "app working!!!",
  });
};

const addRecord = (req, res) => {
  const data = req.body;
  res.status(200).json({
    msg: {
      data,
    },
  });
};

module.exports = { fetchRecords, addRecord };
