const bcrypt = require("bcrypt");

const hashContent = async (content) => {
  const salt = await bcrypt.genSalt(10);
  const hashedContent = await bcrypt.hash(content, salt);

  return hashedContent;
};

module.exports = hashContent;
