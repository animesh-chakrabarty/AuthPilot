const mongoose = require("mongoose");
const validator = require("validator");
const hashContent = require("../utils/hashContent");
const verifyHashedContent = require("../utils/verifyHashedContent");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

userSchema.statics.signupUser = async function (email, password, name) {
  // validation logics
  // 1. check if email, password or name is null
  if (!email || !password || !name) {
    throw new Error("All fields must be filled");
  }
  // 2. check if email is valid
  if (!validator.isEmail(email)) {
    throw new Error("Email is not valid");
  }
  // 3. check if password is strong
  if (!validator.isStrongPassword(password)) {
    throw new Error(" Password is not strong enough");
  }
  // 4. check if email already exists in DB
  const emailDoesExist = await this.findOne({ email });
  if (emailDoesExist) {
    throw new Error("Email already in use");
  }

  const hashedPassword = await hashContent(password);

  try {
    const user = await this.create({ email, password: hashedPassword, name });
    return user;
  } catch (error) {
    console.log("DB error: ", error);
    throw new Error("Error while adding new user credentials to DB");
  }
};

userSchema.statics.loginUser = async function (email, password) {
  // 1. check if all the fields are present
  if (!email || !password) {
    throw new Error("All fields are mandatory");
  }
  // 2. check if email is valid
  if (!validator.isEmail(email)) {
    throw new Error("Email is not valid");
  }
  // find doc by email and match password & return doc
  try {
    const user = await this.findOne({ email });
    if (!user) {
      throw new Error("user doesn't exist");
    }
    const doesPassMatch = await verifyHashedContent(password, user.password);
    if (!doesPassMatch) {
      throw new Error("password is incorrect");
    }
    return user;
  } catch (error) {
    console.log("DB Error: ", error.message);
    throw new Error(error.message);
  }
};

module.exports = mongoose.model("user", userSchema);
