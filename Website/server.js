const express = require('express');
const app = express();
const PORT = 3000;

// Store IP request counts in memory
const requestCounts = {};

app.use((req, res, next) => {
  const ip = req.ip;
  const now = Date.now();

  // Initialize if new
  if (!requestCounts[ip]) {
    requestCounts[ip] = { count: 1, lastRequest: now };
  } else {
    const timeDiff = now - requestCounts[ip].lastRequest;

    // Reset count every 10 seconds
    if (timeDiff > 10000) {
      requestCounts[ip].count = 1;
    } else {
      requestCounts[ip].count++;
    }

    requestCounts[ip].lastRequest = now;

    // Simple rate limit: 20 requests per 10 seconds
    if (requestCounts[ip].count > 20) {
      return res.status(429).send('Too many requests. Calm down.');
    }
  }

  // Simple bot detection
  const agent = req.headers['user-agent'] || '';
  if (agent.length < 10 || agent.toLowerCase().includes('curl')) {
    return res.status(403).send('Bot-like behavior detected.');
  }

  next();
});

app.get('/', (req, res) => {
  res.send('Server protected with simple JS-based middleware.');
});

app.listen(PORT, () => {
  console.log(`Running protection on http://localhost:${PORT}`);
});
