const nodeMailer = require("nodemailer");
// const { emit } = require("nodemon");
require("dotenv").config();

const otpStore = {};

function generateOtp() {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

const transporter = nodeMailer.createTransport({
  host: "smtpout.secureserver.net",
  secure: true,
  port: 465,
  secure: true,
  auth: {
    user: "support@rapidtaxo.com",
    pass: "InoxRapidTaxo2025@Deepak",
  },
  tls: {
    rejectUnauthorized: false,
  },
  socketTimeout: 60000,
  connectionTimeout: 60000,
  greetingTimeout: 30000,
});

const sendOtpEmail = (email, otp) => {
  const mailOptions = {
    from: `'Rapid Taxo' ${"support@rapidtaxo.com"}`,
    to: email,
    subject: "Your One-Time Password (OTP) for Password Setup",
    text: `Your OTP is: ${otp}`,
  };
  return transporter.sendMail(mailOptions);
};

const sendOtp = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res
      .status(400)
      .json({ success: false, message: "Email is required" });
  }

  const otp = generateOtp();

  try {
    await sendOtpEmail(email, otp);
    otpStore[email] = {
      otp,
      expireAt: Date.now() + 3 * 60 * 1000,
    };
    // Return the generated OTP to the client (for storing in local storage)
    res
      .status(200)
      .json({ success: true, message: "OTP sent successfully", otp });
  } catch (error) {
    console.error("Error sending OTP email:", error);
    res.status(500).json({ success: false, message: "Failed to send OTP" });
  }
};
const verifyOtp = (req, res) => {
  const { email, otp } = req.body;

  console.log("Received Email:", email);
  console.log("Received OTP:", otp);

  const storedOtp = otpStore[email];

  if (!storedOtp) {
    console.log("No OTP found for this email.");
    return res.status(400).json({
      success: false,
      message: "OTP is not found or expired.",
    });
  }

  if (Date.now() > storedOtp.expireAt) {
    delete otpStore[email];
    console.log("OTP has expired.");
    return res.status(400).json({
      success: false,
      message: "OTP has expired.",
    });
  }

  if (storedOtp.otp === otp) {
    delete otpStore[email];
    console.log("OTP verified successfully.");
    return res.status(200).json({
      success: true,
      message: "OTP verified successfully.",
    });
  } else {
    console.log("Invalid OTP entered.");
    return res.status(400).json({
      success: false,
      message: "Invalid OTP.",
    });
  }
};

module.exports = { sendOtp, verifyOtp };
