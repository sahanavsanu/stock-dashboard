import { useEffect, useState } from "react";

export default function StockCard({ ticker, price, children }) {
  const [flash, setFlash] = useState("");

  useEffect(() => {
    setFlash("ring-2 ring-emerald-500");
    const t = setTimeout(() => setFlash(""), 300);
    return () => clearTimeout(t);
  }, [price]);

  return (
    <div className={`card card-hover ${flash}`}>
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">{ticker}</h3>
        <span className="badge">LIVE</span>
      </div>

      <div className="text-2xl font-bold mb-3">
        ${price}
      </div>

      <div className="h-12">
        {children}
      </div>
    </div>
  );
}
