
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://unique-book-store.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);


const bookRoutes = require("./src/books/book.route");
const orderRoutes = require("./src/orders/order.route");
const userRoutes = require("./src/users/user.route");
const adminRoutes = require("./src/stats/admin.stats");

app.use("/api/books", bookRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/admin", adminRoutes);


app.get("/", (req, res) => {
  res.send("Book Store Server is running successfully!");
});


async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✔ MongoDB Connected Successfully");
  } catch (err) {
    console.error("❌ MongoDB Connection Failed:", err.message);
    process.exit(1);
  }
}
connectDB();

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
