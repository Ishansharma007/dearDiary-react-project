const express = require("express");
const connectToMongo = require("./db");
const app = express();
var cors = require("cors");
connectToMongo();
const PORT = 8000;


app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Hello");
});

app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.listen(PORT, () => {
    console.log(`iNotebook backend has started on port ${PORT}`);
});