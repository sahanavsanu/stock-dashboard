<div className="flex flex-col lg:flex-row min-h-screen">
  <Sidebar tickers={tickers} onSubscribe={subscribe} />

  <main className="flex-1 p-6">
    <Topbar email={email} />

    <p className="text-slate-400 mb-6">
      Real-time simulated stock prices updating every second.
    </p>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {subscribed.map(ticker => (
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
