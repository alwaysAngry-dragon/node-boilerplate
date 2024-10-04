const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const mongoose = require('mongoose');

const app = require('./app');

const PORT = process.env.PORT || 8000;
const DATABASE__URL = process.env.DATABASE_URL;

mongoose
  .connect(DATABASE__URL)
  .then(() => {
    console.log('Connected to local database');
  })
  .catch((err) => {
    console.log('Error connecting to database');
    console.log(err);
  });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Take care of unhandled rejections

process.on('unhandledRejection', (err) => {
  console.log(
    'UNHANDLED REJECTION! �� Shutting down...'
  );
  console.log(err.name, err.message);
  server.close(() => process.exit(1));
});

// Unhandled synchronous code

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION!!!');
  console.log(err.name, err.message);
  console.log(err.stack);
  process.exit(1);
});
