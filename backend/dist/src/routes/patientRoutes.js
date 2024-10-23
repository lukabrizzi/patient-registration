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
const express_1 = require("express");
const path_1 = __importDefault(require("path"));
const multer_1 = __importDefault(require("multer"));
const patientController_1 = require("../controllers/patientController");
const validation_1 = require("../middleware/validation");
const db_1 = __importDefault(require("../config/db"));
const router = (0, express_1.Router)();
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path_1.default.extname(file.originalname));
    },
});
const upload = (0, multer_1.default)({ storage });
router.post("/patients", upload.single("documentPhoto"), validation_1.validatePatient, patientController_1.registerPatient);
router.get("/patients", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = "SELECT * FROM patients";
    try {
        const [results] = yield db_1.default.query(query);
        res.status(200).json(results);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}));
exports.default = router;
