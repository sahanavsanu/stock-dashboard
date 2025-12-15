import { useState } from "react";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      onLogin(email);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start pt-10">
      <h2 className="text-xl mb-4">Login</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border px-3 py-2 mr-2"
        />

        <button type="submit" className="border px-4 py-2">
          Login
        </button>
      </form>
    </div>
  );
}
