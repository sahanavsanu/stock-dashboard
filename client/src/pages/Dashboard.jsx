import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import StockCard from "../components/StockCard";
import Sparkline from "../components/Sparkline";
import useSocket from "../hooks/useSocket";

export default function Dashboard({ email }) {
  const [tickers, setTickers] = useState([]);
  const [prices, setPrices] = useState({});
  const [history, setHistory] = useState({});
  const [subscribed, setSubscribed] = useState([]);

  useSocket(email, {
    onWelcome: (data) => {
      setTickers(data.tickers);
      setPrices(data.prices);
      setHistory(data.history);
    },
    onPriceUpdate: (data) => {
      setPrices((p) => ({ ...p, [data.ticker]: data.price }));
      setHistory((h) => ({ ...h, [data.ticker]: data.history }));
    },
  });

  const subscribe = (ticker) => {
    if (subscribed.includes(ticker)) return;
    setSubscribed((s) => [...s, ticker]);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <Sidebar tickers={tickers} onSubscribe={subscribe} />

      <main className="flex-1 p-6">
        <Topbar email={email} />

        <p className="text-slate-400 mb-6">
          Real-time simulated stock prices updating every second.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {subscribed.map((ticker) => (
            <StockCard
              key={ticker}
              ticker={ticker}
              price={prices[ticker]}
            >
              <Sparkline data={history[ticker]} />
            </StockCard>
          ))}
        </div>
      </main>
    </div>
  );
}
