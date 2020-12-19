const express = require('express');

const app = express();

app.get('/api/v1/test', (req, res) => {
  res.json({
    data: 'You reached the test endpoint!',
  });
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}...`);
});
