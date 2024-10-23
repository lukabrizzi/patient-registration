"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerPatient = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const db_1 = __importDefault(require("../config/db"));
const transporter = nodemailer_1.default.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});
const registerPatient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, phone } = req.body;
    const documentPhoto = req.file ? req.file.filename : null;
    if (!name || !email || !phone || !documentPhoto) {
        res.status(400).json({ message: "All fields are required" });
        return;
    }
    try {
        const [result] = yield db_1.default.query("INSERT INTO patients (name, email, phone, document_photo) VALUES (?, ?, ?, ?)", [name, email, phone, documentPhoto]);
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Patient Registration Confirmation",
            text: `Thank you, ${name}, for registering as a patient.`,
        };
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.error("Error sending email:", err);
            }
            else {
                console.log("Email sent:", info.response);
            }
        });
        res.status(201).json({ message: "Patient registered successfully" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Database error" });
    }
});
exports.registerPatient = registerPatient;
