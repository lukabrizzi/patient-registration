import { Router, Request, Response } from "express";
import path from "path";
import multer, { StorageEngine } from "multer";
import { registerPatient } from "../controllers/patientController";
import { validatePatient } from "../middleware/validation";
import db from "../config/db";
import { FieldPacket, QueryResult } from "mysql2";

const router = Router();

const storage: StorageEngine = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, "../../uploads/"); // Resolve to backend/uploads/
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.post(
  "/patients",
  upload.single("documentPhoto"),
  validatePatient,
  registerPatient
);

router.get("/patients", async (req: Request, res: Response) => {
  const query = "SELECT * FROM patients";

  try {
    const [results]: [QueryResult, FieldPacket[]] = await db.query(query);
    res.status(200).json(results);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
