const router = require('express').Router();
const nodemailer = require('nodemailer');

// Load environment variables
require('dotenv').config();

router.post('/', async (req, res, next) => {
  const { name, email, phone, subject, message } = req.body;

  // Create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST, // Use your SMTP host here
    port: process.env.SMTP_PORT, // Use the appropriate SMTP port
    secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER, // SMTP username from environment variables
      pass: process.env.SMTP_PASS, // SMTP password from environment variables
    },
  });

  const mailOptions = {
    from: process.env.SMTP_USER, // Use your SMTP email address here
    to: process.env.RECIPIENT_EMAIL, // Recipient email address
    subject: subject || 'No subject', // Provide a default subject
    html: `
      <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
        <h2 style="background-color: #f7f7f7; padding: 10px; border-radius: 5px; text-align: center; color: #333;">
          Contact Form Submitted
        </h2>
        <p style="margin: 10px 0;">
          <strong>Name:</strong> ${name}
        </p>
        <p style="margin: 10px 0;">
          <strong>Email:</strong> ${email}
        </p>
        <p style="margin: 10px 0;">
          <strong>Phone:</strong> ${phone}
        </p>
        <p style="margin: 10px 0;">
          <strong>Subject:</strong> ${subject}
        </p>
        <p style="margin: 10px 0;">
          <strong>Message:</strong> ${message.replace(/\n/g, '<br>')}
        </p>
      </div>
    `,
  };

  try {
    // Send the email
    let info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

module.exports = router;
