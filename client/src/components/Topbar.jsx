export default function Topbar({ email }) {
  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-xl font-semibold">
        📈 Stock Broker Dashboard
      </h1>

      <div className="flex items-center gap-3">
        <button
          onClick={toggleTheme}
          className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-sm"
        >
          🌙 / ☀️
        </button>
        <span className="text-sm text-slate-400">{email}</span>
      </div>
    </div>
  );
}
