import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { LoginInterface } from "../../../interface/login";
import { SetLogin, getMe } from "../../../services/https";
import dollar from "../../../assets/dollar.png";
import financialProfit from "../../../assets/financial-profit.png";
interface LoginProps {
  onSwitchToSignup: () => void;
}
const LoginPage: React.FC<LoginProps> = ({ onSwitchToSignup }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    const data: LoginInterface = { email, password };
    const result = await SetLogin(data);
    if (result?.error) {
      setError(result.error);
    } else {
      const user = await getMe();
      if (user?.role === "admin") {
        navigate("/admin/dashboard");
      } else if (user?.role === "user") {
        navigate("/user/dashboard");
      } else {
        navigate("/");
      }
    }
    setIsLoading(false);
  };

  return (
    <div className="flex h-full">
      {/* Left Side - Form */}
      <div className="w-1/2 p-8 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-8">เข้าสู่ระบบ</h1>

        {error && (
          <div className="w-full max-w-md mb-4 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleLogin} className="w-full max-w-md space-y-4">
          <div>
            <input
              type="email"
              placeholder="อีเมล"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#2DADC2] transition-colors"
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="รหัสผ่าน"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#2DADC2] transition-colors"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 bg-[#2DADC2] hover:bg-[#2597A9] text-white font-semibold rounded-xl transition duration-200 shadow-lg hover:shadow-xl disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isLoading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
          </button>
        </form>

        <p className="mt-4 text-gray-600">
          ยังไม่มีบัญชี?{" "}
          <button
            onClick={onSwitchToSignup}
            className="text-[#2DADC2] hover:underline"
          >
            ลงทะเบียน
          </button>
        </p>
      </div>

      {/* Right Side - Image */}
      <div className="w-1/2 bg-[#2DADC2] p-12 flex flex-col items-center justify-center text-white rounded-l-[80px]">
        <div className="flex items-center gap-6 mb-8">
          <img src={dollar} alt="Logo" className="w-16 h-16" />
          <h2 className="text-3xl font-bold">
            ยินดีต้อนรับกลับ
            <br />
            ระบบจัดการการเงินส่วนบุคคล
          </h2>
        </div>
        <img
          src={financialProfit}
          alt="Financial"
          className="max-w-md w-full drop-shadow-2xl"
        />
        <p className="mt-8 text-center text-lg">
          เครื่องมือที่จะช่วยให้คุณติดตามและวางแผนการใช้จ่าย
          <br />
          ได้อย่างมีประสิทธิภาพ
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
