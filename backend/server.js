require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const connectDB = require(
  "./config/db"
);

const app = express();

connectDB();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://lofo-blue.vercel.app",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"]
  })
);

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true
  })
);

app.use(
  "/uploads",
  express.static("uploads")
);

app.use(
  "/api/auth",
  require("./routes/authRoutes")
);

app.use(
  "/api/items",
  require("./routes/itemRoutes")
);

app.use(
  "/api/admin",
  require("./routes/adminRoutes")
);

app.use(
  "/api/messages",
  require("./routes/messageRoutes")
);

app.use(
  "/api/matches",
  require("./routes/matchRoutes")
);

app.get("/", (req, res) => {
  res.send(
    "LOFO Backend Running"
  );
});

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server Running On Port ${PORT}`
  );
});