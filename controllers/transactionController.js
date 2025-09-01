const Transaction = require("../models/Transaction");

// Add Transaction
exports.addTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.create(req.body);
    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Transactions by User
exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.params.userId });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
