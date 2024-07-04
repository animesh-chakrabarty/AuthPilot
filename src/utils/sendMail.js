const nodemailer = require("nodemailer");
require("dotenv").config();

const sendMail = async (email, OTP) => {
  const config = {
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  };

  const transporter = nodemailer.createTransport(config);

  const info = await transporter.sendMail({
    from: `"Savvy" ${process.env.EMAIL}`,
    to: email,
    subject: "OTP for savvy",
    html: `<h1>${OTP}</h1>`,
  });

  return info;
};

module.exports = sendMail;
