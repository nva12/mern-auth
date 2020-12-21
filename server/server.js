const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// connect to db
const uri = process.env.DATABASE_URI;
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Database connection error: ', err));

// import routes
const userRoutes = require('./routes/userRoutes');

// app middleware
app.use(morgan('dev'));
// app.use(cors()); // allow all origins
if ((process.env.NODE_ENV = 'development')) {
  app.use(cors({ origin: `http://localhost:3000` }));
}
app.use(express.json());

// route middleware
app.use('/api/v1/users', userRoutes);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}...`);
});
