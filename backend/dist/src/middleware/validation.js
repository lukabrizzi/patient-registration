"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePatient = void 0;
const zod_1 = require("zod");
const patientSchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .regex(/^[A-Za-z\s]+$/, { message: "Name must contain only letters" }),
    email: zod_1.z.string().email({ message: "Invalid email address" }),
    phone: zod_1.z.string().regex(/^\+?[0-9]{10,15}$/, {
        message: "Phone number must be between 10 and 15 digits",
    }),
});
const validatePatient = (req, res, next) => {
    try {
        patientSchema.parse(req.body);
        next();
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            res.status(400).json({ errors: error.errors });
        }
        else {
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
};
exports.validatePatient = validatePatient;
