require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const todoRoutes = require('./routes/todos');
const summarizeHandler = require('./services/summarize');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.use('/todos', todoRoutes);
app.post('/summarize', summarizeHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
