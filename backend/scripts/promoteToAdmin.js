require('dotenv').config();
const connectDB = require('../config/db');
const User = require('../models/User');

const email = process.argv[2];

if (!email) {
  console.error('Usage: node scripts/promoteToAdmin.js user@example.com');
  process.exit(1);
}

(async () => {
  try {
    await connectDB();

    const user = await User.findOne({ email });

    if (!user) {
      console.error('User not found:', email);
      process.exit(1);
    }

    user.role = 'admin';
    await user.save();

    console.log(`Promoted ${email} to admin.`);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
