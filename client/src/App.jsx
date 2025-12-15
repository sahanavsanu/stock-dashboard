import { useState } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

export default function App() {
  const [email, setEmail] = useState("");

  if (!email) {
    return <Login onLogin={setEmail} />;
  }

  return <Dashboard email={email} />;
}
