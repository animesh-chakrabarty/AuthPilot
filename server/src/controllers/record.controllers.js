const fetchRecords = (req, res) => {
  res.json({
    msg: "app working!!!",
  });
};

const addRecord = (req, res) => {
  const data = req.body;
  res.status(400).json({
    msg: {
      data,
    },
  });
};

module.exports = { fetchRecords, addRecord };
