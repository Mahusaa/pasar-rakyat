const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/stock');

const app = express();

app.use(bodyParser.json());
app.use('/api', routes);

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
