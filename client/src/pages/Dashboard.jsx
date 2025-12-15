import React from "react";

export default function Dashboard({ email, onLogout }) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Welcome, {email}</h1>

      <button
        className="mt-4 bg-red-600 text-white px-4 py-2 rounded"
        onClick={onLogout}
      >
        Logout
      </button>

      <p className="mt-6">Dashboard content goes here...</p>
    </div>
  );
}
