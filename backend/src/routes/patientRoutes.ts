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
    const uploadDir = path.join(__dirname, "../../uploads");
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: any) => {
  const fileExtension = path.extname(file.originalname).toLowerCase();
  if (fileExtension === ".jpg") {
    cb(null, true);
  } else {
    cb(new Error("Only .jpg images are allowed"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
}).single("documentPhoto");

router.post("/patients", upload, validatePatient, registerPatient);

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
