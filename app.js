require('dotenv').config();
const connectDB = require('./db/connect');

// async errors

const express = require('express');
const app = express();

// middleware

const notFoundMiddleware = require('./middlewares/not-found');
const errorMiddleware = require('./middlewares/error-handler');

app.use(express.json());

app.get('/', (req, res) => {
  res.send('<h1>Store API</h1>');
});

// products route
app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 5000;
const connection_url = process.env.DB_URL;

const start = async () => {
  try {
    //   connectDB
    await connectDB(connection_url);
    app.listen(port, console.log(`Server is listening port ${port}...`));
  } catch (err) {
    console.log(err);
  }
};

start();
