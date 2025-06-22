const path = require('path');
const express = require('express');
const jsonServer = require('json-server');
const { exec } = require('child_process');

const app = express();
const router = jsonServer.router(path.join(__dirname, 'db', 'db.json'));
const middlewares = jsonServer.defaults({
  static: path.join(__dirname, 'public')
});

// Serve static files from src/public
app.use(express.static(path.join(__dirname, 'public')));

// Use default middlewares (logger, static, cors, no-cache)
app.use(middlewares);

// Use json-server router
app.use('/api', router);

// Redirect root to index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);

  // Open default browser at the server URL
  const start =
    process.platform == 'darwin' ? 'open' :
    process.platform == 'win32' ? 'start' :
    'xdg-open';
  exec(`${start} http://localhost:${port}`);
});
