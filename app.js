
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.static("public"));

// API routes
const api = require("./routes/api");
app.use("/api", api);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`);
});