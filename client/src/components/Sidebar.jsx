export default function Sidebar({ tickers, onSubscribe }) {
  return (
    <div className="w-56 bg-slate-900 border-r border-slate-800 p-4">
      <h2 className="text-sm uppercase text-slate-400 mb-4">
        Supported Stocks
      </h2>

      <div className="space-y-2">
        {tickers.map(t => (
          <button
            key={t}
            onClick={() => onSubscribe(t)}
            className="w-full text-left px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition"
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  );
}
