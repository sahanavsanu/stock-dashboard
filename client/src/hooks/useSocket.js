import { useEffect, useRef } from "react";
import { io } from "socket.io-client";

// ✅ Use Render backend in production, localhost in dev
const SERVER =
  import.meta.env.VITE_SERVER_URL ||
  "https://stock-dashboard-gcj0.onrender.com";

export default function useSocket(email, handlers) {
  const sockRef = useRef(null);

  useEffect(() => {
    if (!email) return;

    const socket = io(SERVER, {
      transports: ["websocket"],
    });

    sockRef.current = socket;

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
      socket.emit("login", email);
    });

    socket.on("welcome", (data) => {
      handlers?.onWelcome && handlers.onWelcome(data);
    });

    socket.on("priceUpdate", (data) => {
      handlers?.onPriceUpdate && handlers.onPriceUpdate(data);
    });

    return () => {
      socket.disconnect();
    };
  }, [email]);

  return sockRef;
}
