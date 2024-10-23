const express = require("express");
const dotenv = require("dotenv");
const patientRoutes = require("./dist/src/routes/patientRoutes").default;
const path = require("path");
const cors = require("cors");

dotenv.config();

const app = express();

// Also we can allow just the port 3001 to use our BE
// app.use(cors({ origin: 'http://localhost:3001' }));
app.use(cors());

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use("/api", patientRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
