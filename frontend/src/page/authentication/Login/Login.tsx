import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { LoginInterface } from "../../../interface/login";
import { SetLogin, getMe } from "../../../services/https";
import dollar from "../../../assets/dollar.png";
import financialProfit from "../../../assets/financial-profit.png";
import message from "antd/es/message";
import { Sleep } from "../../../utils/sleep";
interface LoginProps {
  onSwitchToSignup: () => void;
}
interface FormErrors {
  [key: string]: string;
}
const LoginPage: React.FC<LoginProps> = ({ onSwitchToSignup }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [formData, setFormData] = useState<LoginInterface>({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const touchAll = Object.keys(formData).reduce(
      (acc, key) => ({ ...acc, [key]: true }),
      {}
    );
    setTouched(touchAll);

    if (!validateForm()) return;

    setIsLoading(true);
    setError("");

    try {
      const result = await SetLogin(formData);
      if (result?.error) {
        messageApi.error(result.error);
        setError(result.error);
      } else {
        messageApi.success("เข้าสู่ระบบสำเร็จ!");
        await Sleep(2000);
        const user = await getMe();
        if (user?.role === "admin") navigate("/admin/dashboard");
        else if (user?.role === "user") navigate("/user/dashboard");
        else navigate("/");
      }
    } catch (err) {
      messageApi.error("เกิดข้อผิดพลาดในการเชื่อมต่อกับระบบ");
      setError("เกิดข้อผิดพลาดในการเชื่อมต่อกับระบบ");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    setError("");
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.email) newErrors.email = "กรุณากรอกอีเมล";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "กรุณากรอกอีเมลให้ถูกต้อง";

    if (!formData.password) newErrors.password = "กรุณากรอกรหัสผ่าน";
    else if (formData.password.length < 6)
      newErrors.password = "รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getInputClassName = (fieldName: keyof LoginInterface) => `
  w-full px-4 py-3 border rounded-lg transition-colors
  ${
    touched[fieldName] && errors[fieldName]
      ? "border-red-500 focus:outline-none focus:border-red-500"
      : "border-gray-300 focus:outline-none focus:border-[#2DADC2]"
  }
`;

  return (
    <div className="flex h-full">
      {contextHolder}
      {/* Left Side - Form */}
      <div className="w-1/1 bg-[#2DADC2] p-12 flex flex-col items-center justify-center text-white rounded-r-4xl">
        <div className="flex items-center gap-6 mb-8 flex-col">
          <img src={dollar} alt="Logo" className="w-16 h-16" />

          <h2 className="text-4xl font-bold">ยินดีต้อนรับเข้าสู่</h2>
          <h2 className="text-4xl font-bold">ระบบจัดการการเงินส่วนบุคคล</h2>
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

      {/* Right Side - Image */}
      <div className="w-1/1 p-8 flex flex-col items-center justify-center">
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
              name="email"
              placeholder="อีเมล"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={getInputClassName("email")}
            />
            {touched.email && errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="รหัสผ่าน"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className={getInputClassName("password")}
            />
            {touched.password && errors.password && (
              <p className="mt-1 text-sm text-red-500">{errors.password}</p>
            )}
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
    </div>
  );
};

export default LoginPage;
