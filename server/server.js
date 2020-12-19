const express = require('express');

const app = express();

// import routes
const userRoutes = require('./routes/userRoutes');

// middleware
app.use('/api/v1/users', userRoutes);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}...`);
});
