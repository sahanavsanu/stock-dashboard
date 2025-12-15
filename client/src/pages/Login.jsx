import { useState } from "react";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    if (onLogin) {
      onLogin(email.trim());
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-900 p-8 rounded-xl shadow-lg w-80"
      >
        <h2 className="text-xl font-semibold mb-6 text-center text-white">
          Login
        </h2>

        <input
          type="email"
          required
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 mb-4 rounded-lg
                     bg-slate-800 text-white
                     placeholder-slate-400
                     focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />

        <button
          type="submit"
          disabled={!email.trim()}
          className="w-full py-2 rounded-lg 
                     bg-emerald-600 hover:bg-emerald-500 
                     disabled:bg-slate-600 disabled:cursor-not-allowed
                     transition text-white"
        >
          Login
        </button>
      </form>
    </div>
  );
}
