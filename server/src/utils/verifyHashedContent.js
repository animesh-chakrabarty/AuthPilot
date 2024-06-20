const bcrypt = require("bcrypt");

const verifyHashedContent = async (content, hashedContent) => {
  return await bcrypt.compare(content, hashedContent);
};

module.exports = verifyHashedContent;
