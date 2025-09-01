const express = require("express");
const Transaction = require("../models/Transaction");
const parseTransaction = require("../services/aiParser");

const router = express.Router();

// Parse transaction + save
router.post("/parse", async (req, res) => {
  try {
    const { text, userId } = req.body;
    if (!text || !userId) return res.status(400).json({ error: "Missing text or userId" });

    const parsed = await parseTransaction(text);

    const transaction = await Transaction.create({
      user: userId,
      amount: parsed.amount,
      category: parsed.category,
      description: parsed.description
    });

    res.json(transaction);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Get user's transactions
router.get("/:userId", async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.params.userId });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});




// Update transaction
router.put("/:id", async (req, res) => {
  try {
    const { amount, category, description } = req.body;
    const updated = await Transaction.findByIdAndUpdate(
      req.params.id,
      { amount, category, description },
      { new: true } // return updated doc
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete transaction
router.delete("/:id", async (req, res) => {
  try {
    await Transaction.findByIdAndDelete(req.params.id);
    res.json({ message: "Transaction deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



module.exports = router;
