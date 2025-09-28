import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { LoginInterface } from "../../../interface/login";
import { SetLogin } from "../../../services/https";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    setIsLoading(true);
    setError("");
    const data: LoginInterface = { email, password };
    const result = await SetLogin(data);
    if (result?.error) {
      setError(result.error);
    } else {
      const role = result.role || "";
      if (role === "admin") {
        navigate("/admin/dashboard");
      } else if (role === "user") {
        navigate("/dashboard"); // หรือ path ที่ต้องการ
      } else {
        navigate("/"); // fallback
      } // เปลี่ยนเป็น path หลัง login ของคุณ
    }
    setIsLoading(false);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">เข้าสู่ระบบ</h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <input
          type="email"
          placeholder="อีเมล"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="password"
          placeholder="รหัสผ่าน"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={handleLogin}
          disabled={isLoading}
          className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 disabled:bg-blue-300"
        >
          {isLoading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
