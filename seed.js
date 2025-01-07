const User = require('./models/User');
const Transaction = require('./models/Transaction');

const getRandomDate = (start, end) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

const seedData = async () => {
  try {
    await User.deleteMany({});
    await Transaction.deleteMany({});

    const users = [];
    for (let i = 1; i <= 10; i++) {
      users.push({ name: `User${i}`, phoneNumber: `123456789${i}` });
    }
    const createdUsers = await User.insertMany(users);

    const transactions = [];
    const startDate = new Date('2023-01-01');
    const endDate = new Date('2025-01-10');

    createdUsers.forEach(user => {
      for (let i = 1; i <= 5; i++) {
        transactions.push({
          status: ['success', 'pending', 'failed'][Math.floor(Math.random() * 3)],
          type: ['debit', 'credit'][Math.floor(Math.random() * 2)],
          transactionDate: getRandomDate(startDate, endDate),
          amount: Math.floor(Math.random() * 1000) + 1,
          userId: user._id,
        });
      }
    });

    await Transaction.insertMany(transactions);
    console.log('Data seeded successfully');
  } catch (error) {
    console.error('Error seeding data:', error.message);
  }
};

module.exports = seedData;
