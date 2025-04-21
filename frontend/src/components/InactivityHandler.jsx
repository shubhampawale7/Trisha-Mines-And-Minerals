/* eslint-disable no-unused-vars */
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const InactivityHandler = ({ timeout = 15 * 60 * 1000 }) => {
  const navigate = useNavigate();
  const timer = useRef(null);

  const logout = () => {
    // Clear JWT cookie from backend
    fetch("http://localhost:5000/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    // Remove token from local storage
    localStorage.removeItem("token");
    navigate("/login");
  };

  const resetTimer = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(logout, timeout);
  };

  useEffect(() => {
    const events = [
      "mousemove",
      "mousedown",
      "click",
      "scroll",
      "keypress",
      "touchstart",
    ];

    events.forEach((event) => window.addEventListener(event, resetTimer));
    resetTimer(); // initialize on mount

    return () => {
      events.forEach((event) => window.removeEventListener(event, resetTimer));
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  return null;
};

export default InactivityHandler;
