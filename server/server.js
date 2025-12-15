// server.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' }
});

// Supported tickers
const TICKERS = ['GOOG','TSLA','AMZN','META','NVDA'];

// Current prices and short history for sparklines
const prices = {};
const history = {};

TICKERS.forEach(t => {
  const initial = 100 + Math.random() * 1500;
  prices[t] = initial;
  history[t] = [initial];
});

io.on('connection', socket => {
  console.log('socket connected:', socket.id);

  // Login: client sends email
  socket.on('login', (email) => {
    socket.data.email = email;
    // send available tickers and rounded current prices + history
    const roundedPrices = Object.fromEntries(
      TICKERS.map(t => [t, prices[t].toFixed(2)])
    );
    socket.emit('welcome', { tickers: TICKERS, prices: roundedPrices, history });
    console.log(`login from ${email} (${socket.id})`);
  });

  // Subscribe / join a ticker room
  socket.on('subscribe', (ticker) => {
    if (!TICKERS.includes(ticker)) return;
    socket.join(ticker);
    console.log(`${socket.id} subscribed to ${ticker}`);
  });

  // Unsubscribe / leave
  socket.on('unsubscribe', (ticker) => {
    socket.leave(ticker);
    console.log(`${socket.id} unsubscribed from ${ticker}`);
  });

  socket.on('disconnect', () => {
    console.log('socket disconnected:', socket.id);
  });
});

// Price generator: update every second and emit to room
setInterval(() => {
  TICKERS.forEach(t => {
    const old = prices[t];
    const delta = (Math.random() - 0.5) * (old * 0.02); // ~2% volatility
    const next = Math.max(1, old + delta);
    prices[t] = next;

    // update history (keep last 30)
    history[t].push(next);
    if (history[t].length > 30) history[t].shift();

    const rounded = next.toFixed(2);
    io.to(t).emit('priceUpdate', {
      ticker: t,
      price: rounded,
      timestamp: Date.now(),
      history: history[t].slice()
    });
  });
}, 1000);

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
