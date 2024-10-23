import { z } from "zod";
import { Request, Response, NextFunction } from "express";
import db from "../config/db";
import { RowDataPacket } from "mysql2";

const patientSchema = z.object({
  name: z
    .string()
    .regex(/^[A-Za-z\s]+$/, { message: "Name must contain only letters" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().regex(/^\+?[0-9]{10,15}$/, {
    message: "Phone number must be between 10 and 15 digits",
  }),
});

export const validatePatient = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  console.log("Validating patient with data:", req.body);

  try {
    patientSchema.parse(req.body);
    const { name, email, phone } = req.body;

    const [existingPatients]: [RowDataPacket[], any] = await db.query(
      "SELECT * FROM patients WHERE name = ? OR email = ? OR phone = ?",
      [name, email, phone]
    );

    console.log("Existing patients found:", existingPatients);

    if (existingPatients.length > 0) {
      res
        .status(409)
        .json({
          message:
            "A patient with the same name, email, or phone number already exists",
        });
      return;
    }

    next();
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ errors: error.errors });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
};
