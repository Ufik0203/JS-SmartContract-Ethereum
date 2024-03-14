const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const rateLimit = require("express-rate-limit");

const app = express();
const port = 3000;

app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rate limiting for brute force or DDoS
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use(limiter);

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username dan password diperlukan' });
  }

  if (username === 'admin' && password === 'admin123') {
    return res.json({ message: 'Login berhasil' });
  } else {
    return res.status(401).json({ error: 'Autentikasi gagal' });
  }
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:3000`);
});