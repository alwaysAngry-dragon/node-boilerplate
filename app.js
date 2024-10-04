const express = require('express');
const morgan = require('morgan');

const aggregateRoute = require('./routes/aggregateRoute');

const app = express();

app.use(morgan('dev'));

app.use(express.json());

app.use(express.static(`${__dirname}/public`));

// routes

app.use('/aggregate', aggregateRoute);

app.all('*', (req, res, next) => {
  res.status(404).json({
    status: 'error',
    message: 'Page not found',
  });
});

module.exports = app;
