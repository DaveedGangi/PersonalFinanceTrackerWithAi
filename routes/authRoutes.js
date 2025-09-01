const express = require("express");
const passport = require("passport");

const router = express.Router();

// Login via Google
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Google callback
router.get("/google/callback",
  passport.authenticate("google", { failureRedirect: "/auth/failure" }),
  (req, res) => {
    // Redirect to frontend dashboard on success
    res.redirect(`${process.env.FRONTEND_ORIGIN}/dashboard`);
  }
);

// Get current logged-in user
router.get("/me", (req, res) => {
  if (!req.user) return res.json({ user: null });
  res.json({ user: req.user });
});

// Logout
router.get("/logout", (req, res) => {
  req.logout(err => {
    if (err) return res.status(500).json({ message: "Logout failed" });
    req.session.destroy(() => {
      res.clearCookie("connect.sid");
      res.json({ message: "Logged out successfully" });
    });
  });
});

module.exports = router;
