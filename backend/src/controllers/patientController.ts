import { Request, Response } from "express";
import nodemailer from "nodemailer";
import db from "../config/db";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const registerPatient = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name, email, phone } = req.body;
  const documentPhoto = req.file ? req.file.filename : null;

  if (!name || !email || !phone || !documentPhoto) {
    res.status(400).json({ message: "All fields are required" });
    return;
  }

  try {
    await db.query(
      "INSERT INTO patients (name, email, phone, documentPhoto) VALUES (?, ?, ?, ?)",
      [name, email, phone, documentPhoto]
    );

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Patient Registration Confirmation",
      text: `Thank you, ${name}, for registering as a patient.`,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error("Error sending email:", err);
      } else {
        console.log("Email sent:", info.response);
      }
    });

    res.status(201).json({ message: "Patient registered successfully" });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: "Database error" });
  }
};
