const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

// Load config
let config;
try {
  config = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'config.json'), 'utf8'));
} catch (err) {
  console.error('Error loading config.json:', err);
  process.exit(1);
}

// Stealth 404 Helper
function sendStealth404(res) {
  res.status(404).sendFile(path.join(process.cwd(), 'pages', '404.html'));
}

// Static Assets
app.use('/assets', express.static(path.join(process.cwd(), 'public/assets')));
app.use('/meme', express.static(path.join(process.cwd(), 'public/meme')));

// --- Routes ---

app.get('/start', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'pages', 'start.html'));
});

app.get('/451/58/8/13', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'pages', 'next.html'));
});

// Default 404
app.use((req, res) => {
  sendStealth404(res);
});

module.exports = app;
