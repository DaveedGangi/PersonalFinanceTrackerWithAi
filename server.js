require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const cors = require("cors");

require("./config/passport"); // configure passport

const authRoutes = require("./routes/authRoutes");

const transactionRoutes = require("./routes/transactionRoutes");



const app = express();




// CORS with credentials
{/*
app.use(cors({
  origin: process.env.FRONTEND_ORIGIN,
  credentials: true
}));

*/}

app.use(
  cors({
    origin: process.env.FRONTEND_ORIGIN || "http://localhost:3000", // frontend
    credentials: true,               // ✅ allow cookies
  })
);

// Session middleware


app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      collectionName: "sessions",
    }),
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 1000 * 60 * 60 * 24 * 7
    }
  })
);


// Passport middleware
app.use(passport.initialize());
app.use(passport.session());


app.use(express.json());
// Routes
app.use("/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);
// Connect MongoDB and start server

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on ${PORT}`));
  })
  .catch(err => console.error(err));
