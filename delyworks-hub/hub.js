const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config({ path: './config.env' });
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(require('./routes/item'));

// Get driver connection
const dbo = require('./database/connection');

app.listen(port, () => {
  // Perform a database connection when server starts
  dbo.connectToServer();

  console.log(`Server is running on port: ${port}`);
});
