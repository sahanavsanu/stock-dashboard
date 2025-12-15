import React, { useState } from "react";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";

export default function App() {
  const [email, setEmail] = useState(null);

  return (
    <div>
      {email ? (
        <Dashboard email={email} onLogout={() => setEmail(null)} />
      ) : (
        <Login onLogin={setEmail} />
      )}
    </div>
  );
}
