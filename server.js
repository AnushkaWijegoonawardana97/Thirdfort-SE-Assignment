const express = require("express");
const connectDB = require("./config/db");

const app = express();

// DB Connnection
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

app.get("/", (request, response) => response.send("API Running"));

// Define Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/notes", require("./routes/api/notes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server Started On Port ${PORT}`));
