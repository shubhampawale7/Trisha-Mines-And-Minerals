/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SetupAdmin = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");

    // Ensure username is provided
    if (!username || !email || !password) {
      setMsg("❌ All fields are required");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/setup-admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }), // send all 3 fields
      });

      const data = await res.json();
      if (res.ok) {
        setMsg("✅ Admin created successfully! Redirecting...");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setMsg(`❌ ${data.message}`);
      }
    } catch (err) {
      setMsg("❌ Server error");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#FDF9F3] text-[#2B1A0F] px-4">
      <h1 className="text-3xl font-bold mb-6 text-[#D9AE4E]">Admin Setup</h1>
      <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
        <input
          type="text"
          placeholder="Admin Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="w-full p-3 border border-[#D9AE4E] rounded-lg"
        />
        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-3 border border-[#D9AE4E] rounded-lg"
        />
        <input
          type="password"
          placeholder="Set Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-3 border border-[#D9AE4E] rounded-lg"
        />
        <button
          type="submit"
          className="w-full bg-[#D9AE4E] hover:bg-[#C89B3C] text-white font-semibold py-3 rounded-lg transition"
        >
          Create Admin
        </button>
        {msg && <p className="text-center mt-4">{msg}</p>}
      </form>
    </div>
  );
};

export default SetupAdmin;
