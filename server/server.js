// server.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

// ✅ Health check route (IMPORTANT for Render / browser)
app.get('/', (req, res) => {
  res.send('Stock Dashboard Backend is Running');
});

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// Supported tickers
const TICKERS = ['GOOG', 'TSLA', 'AMZN', 'META', 'NVDA'];

// Current prices and history
const prices = {};
const history = {};

TICKERS.forEach(t => {
  const initial = 100 + Math.random() * 1500;
  prices[t] = initial;
  history[t] = [initial];
});

io.on('connection', (socket) => {
  console.log('Socket connected:', socket.id);

  // Login
  socket.on('login', (email) => {
    socket.data.email = email;

    const roundedPrices = Object.fromEntries(
      TICKERS.map(t => [t, prices[t].toFixed(2)])
    );

    socket.emit('welcome', {
      tickers: TICKERS,
      prices: roundedPrices,
      history
    });

    console.log(`Login from ${email}`);
  });

  // Subscribe to stock
  socket.on('subscribe', (ticker) => {
    if (!TICKERS.includes(ticker)) return;
    socket.join(ticker);
    console.log(`${socket.id} subscribed to ${ticker}`);
  });

  // Unsubscribe
  socket.on('unsubscribe', (ticker) => {
    socket.leave(ticker);
    console.log(`${socket.id} unsubscribed from ${ticker}`);
  });

  socket.on('disconnect', () => {
    console.log('Socket disconnected:', socket.id);
  });
});

// Update prices every second
setInterval(() => {
  TICKERS.forEach(ticker => {
    const oldPrice = prices[ticker];
    const change = (Math.random() - 0.5) * oldPrice * 0.02;
    const newPrice = Math.max(1, oldPrice + change);

    prices[ticker] = newPrice;

    history[ticker].push(newPrice);
    if (history[ticker].length > 30) history[ticker].shift();

    io.to(ticker).emit('priceUpdate', {
      ticker,
      price: newPrice.toFixed(2),
      timestamp: Date.now(),
      history: history[ticker]
    });
  });
}, 1000);

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
