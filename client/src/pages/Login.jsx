import { useState } from "react";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    onLogin(email.trim());
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#0f172a",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: "#020617",
          padding: 30,
          borderRadius: 10,
          width: 300,
        }}
      >
        <h2 style={{ color: "white", textAlign: "center", marginBottom: 20 }}>
          Login
        </h2>

        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: 10,
            marginBottom: 15,
            borderRadius: 5,
            border: "none",
          }}
          required
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: 10,
            borderRadius: 5,
            border: "none",
            background: "#10b981",
            color: "white",
            fontWeight: "bold",
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
}
