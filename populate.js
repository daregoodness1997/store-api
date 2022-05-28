require('dotenv').config();

const connectDB = require('./db/connect');
const Product = require('./models/Product');
const jsonProducts = require('./products.json');
const connection_url = process.env.DB_URL;

const start = async () => {
  try {
    await connectDB(connection_url);
    await Product.deleteMany();
    await Product.create(jsonProducts);
    console.log('Success');
    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

start();
