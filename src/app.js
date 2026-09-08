'use strict';

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');

const petRoutes = require('./routes/petRoutes');
const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./middlewares/errorHandler');
const ApiError = require('./utils/ApiError');

const app = express();

app.use(helmet());
app.use(cors());
app.use(compression());
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));

app.get('/', (req, res) => {
  res.status(200).json({ status: 'ok', service: 'pet_it', time: new Date().toISOString() });
});

app.use('/api/v1/pets', petRoutes);
app.use('/api/v1/users', userRoutes);

// 404 handler — must come after all valid routes
app.use((req, res, next) => {
  next(new ApiError(404, `Route ${req.originalUrl} not found`));
});

app.use((req, res, next) => {
  console.log('Content-Type received:', req.headers['content-type']);
  next();
});

// Central error handler — must be last
app.use(errorHandler);

module.exports = app;