require('dotenv').config();
const connectDB = require('../config/db');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

const email = process.argv[2];
const passwordArg = process.argv[3];
const nameArg = process.argv[4] || 'Admin User';

if (!email) {
  console.error('Usage: node scripts/createAdmin.js email [password] [name]');
  process.exit(1);
}

function genPassword(len = 12) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
  let out = '';
  for (let i = 0; i < len; i++) out += chars[Math.floor(Math.random() * chars.length)];
  return out;
}

(async () => {
  try {
    await connectDB();

    let user = await User.findOne({ email });

    const password = passwordArg || genPassword(14);
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    if (user) {
      user.role = 'admin';
      // If passwordArg provided, update password, else leave existing
      if (passwordArg) user.password = hashed;
      await user.save();
      console.log(`Updated existing user ${email} to admin.`);
    } else {
      user = await User.create({
        name: nameArg,
        email,
        password: hashed,
        role: 'admin'
      });
      console.log(`Created admin user ${email}.`);
    }

    console.log('Login credentials:');
    console.log(`  email: ${email}`);
    console.log(`  password: ${password}`);
    console.log('Please store this password securely and change it after first login.');

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
