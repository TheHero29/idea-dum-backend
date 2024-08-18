const express = require('express');
require('dotenv').config();
const cors = require('cors');
const app = express();
const loggerMiddleware = require('./middleware/logger');
const port = process.env.PORT || 3025;
require('dotenv').config();

//connecting to database
const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Failed to connect to MongoDB...", err));

//Middleware
app.use(express.json());
app.use(cors());
app.use(loggerMiddleware);

//Routes
app.use('/api',require('./routes/apiRoutes'));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
