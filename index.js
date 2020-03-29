const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const trackRoutes = require('./routes/trackRoutes');
const requireAuth = require('./middlewares/requireAuth');

dotenv.config({ path: './config.env' });

// Initialize app
const app = express();

app.use(bodyParser.json());
app.use(authRoutes);

// Connect to DB
const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
  console.log('Connected to mongo instance');
});

mongoose.connection.on('error', err => {
  console.error('Error connectiong to mongo', err);
});

app.use('/', authRoutes);
app.use('/track', trackRoutes);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});

process.on('SIGTERM', () => {
  console.log('👌👌 SIGTERM RECEIVED. Shutting down gracefully 👌👌');
  server.close(() => console.log('💥 Process terminated!'));
});
