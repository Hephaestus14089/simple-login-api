const express = require('express');
const app = express();
const PORT = process.env.PORT || 3500;
const logger = require('./middleware/logger');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger); // custom middleware

app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));
app.use('/employees', require('./routes/api/employees'));

app.get('/', (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}...`)
});
