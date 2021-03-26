const express = require('express'); //bringing in express
// above syntax is called COMMON_JS,
// we can use 'import' only after implementing babel or typescript
// react uses ES6 modules that has 'import'

const connectDB = require('./config/db');

const app = express();

// Connect Database
connectDB();

app.get('/', (req, res) =>
  res.json({ msg: 'Welcome to the ContactKeeper API...' })
);
// app.get('/', (req, res) => res.send('Hello World'));
// one way to send data, can put  HTML too
// sendFile() -> to send file

// ==== DEFINE ROUTES =================================
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
