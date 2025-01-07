const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');
const User = require('../models/User');
const mongoose = require("../config/db.js");



// Get all transactions for a user by userId
router.get('/user/:userId', async (req, res) => {
  const { status, type, from, to, page = 1, limit = 10 } = req.query;

  try {
    // Convert userId to ObjectId
    const userId = mongoose.Types.ObjectId(req.params.userId);

    // Build filters
    const filters = { userId };
    if (status) filters.status = status;
    if (type) filters.type = type;
    if (from || to) {
      filters.transactionDate = {};
      if (from) filters.transactionDate.$gte = new Date(from);
      if (to) filters.transactionDate.$lte = new Date(to);
    }

    console.log('Filters Applied:', filters);

    // MongoDB Aggregation
    const transactions = await Transaction.aggregate([
      { $match: filters },
      { $sort: { transactionDate: -1 } },
      { $skip: (parseInt(page) - 1) * parseInt(limit) },
      { $limit: parseInt(limit) },
    ]);

    // Get the total count of transactions
    const total = await Transaction.countDocuments(filters);

    console.log('Transactions Retrieved:', transactions);

    res.json({
      total,
      page: parseInt(page, 10),
      transactions,
    });
  } catch (error) {
    console.error('Error fetching transactions:', error.message);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});


// Get all transactions with user details and filters
router.get('/', async (req, res) => {
  const { status, type, from, to, page = 1, limit = 10 } = req.query;

  const filters = {};
  if (status) filters.status = status;
  if (type) filters.type = type;
  if (from || to) {
    filters.transactionDate = {};
    if (from) filters.transactionDate.$gte = new Date(from);
    if (to) filters.transactionDate.$lte = new Date(to);
  }

  console.log(`Fetching all transactions with filters:`, filters);

  try {
    const transactions = await Transaction.aggregate([
      { $match: filters },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'userDetails',
        },
      },
      { $unwind: '$userDetails' },
      { $sort: { transactionDate: -1 } },
      { $skip: (page - 1) * limit },
      { $limit: parseInt(limit, 10) },
    ]);

    const total = await Transaction.countDocuments(filters);
    console.log(`Fetched ${transactions.length} transactions with user details, Total: ${total}`);

    res.json({ total, page: parseInt(page, 10), transactions });
  } catch (error) {
    console.error('Error fetching transactions with user details:', error.message);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;