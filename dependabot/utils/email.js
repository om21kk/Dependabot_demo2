const nodemailer = require('nodemailer');
const _ = require('lodash');

const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: 'test@example.com',
    pass: 'password'
  }
});

const sendEmail = async (to, subject, text) => {
  const mailOptions = {
    from: 'test@example.com',
    to: to,
    subject: subject,
    text: text
  };
  
  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Email error:', error);
  }
};

const generateEmailTemplate = (data) => {
  return _.template('Hello <%= name %>, your account has been created!')(data);
};

module.exports = { sendEmail, generateEmailTemplate };