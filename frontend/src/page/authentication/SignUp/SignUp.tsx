import React, { useState } from "react";
import dollar from "../../../assets/dollar.png";
import financialProfit from "../../../assets/financial-profit.png";
import { SetSignUp } from "../../../services/https";
import type { SignUpInterface } from "../../../interface/SignUp";
import { message } from "antd";
import { Sleep } from "../../../utils/sleep";

interface FormErrors {
  [key: string]: string;
}

interface SignUpProps {
  onSwitchToLogin: () => void;
}

const SignUp: React.FC<SignUpProps> = ({ onSwitchToLogin }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [formData, setFormData] = useState<SignUpInterface>({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
    setApiError(""); // Clear API error when user types
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.first_name) {
      newErrors.first_name = "กรุณากรอกชื่อ";
    }

    if (!formData.last_name) {
      newErrors.last_name = "กรุณากรอกนามสกุล";
    }

    if (!formData.email) {
      newErrors.email = "กรุณากรอกอีเมล";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "กรุณากรอกอีเมลให้ถูกต้อง";
    }

    if (!formData.password) {
      newErrors.password = "กรุณากรอกรหัสผ่าน";
    } else if (formData.password.length < 6) {
      newErrors.password = "รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร";
    }

    if (!formData.confirm_password) {
      newErrors.confirm_password = "กรุณายืนยันรหัสผ่าน";
    } else if (formData.confirm_password !== formData.password) {
      newErrors.confirm_password = "รหัสผ่านไม่ตรงกัน";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const touchAll = Object.keys(formData).reduce(
      (acc, key) => ({ ...acc, [key]: true }),
      {}
    );
    setTouched(touchAll);

    if (validateForm()) {
      setIsLoading(true);
      setApiError("");

      const signUpData: SignUpInterface = {
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        password: formData.password,
        confirm_password: formData.confirm_password,
      };

      try {
        const result = await SetSignUp(signUpData);
        if (result.success) {
          messageApi.success("สมัครสมาชิกสำเร็จ! กรุณาเข้าสู่ระบบ");
          await Sleep(2000);
          onSwitchToLogin();
        } else {
          messageApi.error(result.error || "เกิดข้อผิดพลาดในการลงทะเบียน");
          setApiError(result.error || "เกิดข้อผิดพลาดในการลงทะเบียน");
        }
      } catch (error) {
        messageApi.error("เกิดข้อผิดพลาดในการเชื่อมต่อกับระบบ");
        setApiError("เกิดข้อผิดพลาดในการเชื่อมต่อกับระบบ");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const getInputClassName = (fieldName: keyof SignUpInterface) => `
    w-full px-4 py-2 border rounded-lg transition-colors
    ${
      touched[fieldName] && errors[fieldName]
        ? "border-red-500 focus:outline-none focus:border-red-500"
        : "border-gray-300 focus:outline-none focus:border-[#2DADC2]"
    }
  `;

  return (
    <div className="flex h-full">
      {contextHolder}
      {/* Left Side - Image */}
      <div className="w-1/2 bg-[#2DADC2] p-12 flex flex-col items-center justify-center text-white rounded-r-4xl">
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

      {/* Right Side - Form */}
      <div className="w-full md:w-1/2 p-8 flex flex-col items-center justify-start mt-16">
        <h1 className="text-3xl font-bold mb-12">ลงทะเบียน</h1>

        {apiError && (
          <div className="w-full max-w-md mb-4 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
            {apiError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
          <div>
            <input
              type="text"
              name="first_name"
              placeholder="ชื่อ"
              value={formData.first_name}
              onChange={handleChange}
              onBlur={handleBlur}
              className={getInputClassName("first_name")}
            />
            {touched.first_name && errors.first_name && (
              <p className="mt-1 text-sm text-red-500">{errors.first_name}</p>
            )}
          </div>

          <div>
            <input
              type="text"
              name="last_name"
              placeholder="นามสกุล"
              value={formData.last_name}
              onChange={handleChange}
              onBlur={handleBlur}
              className={getInputClassName("last_name")}
            />
            {touched.last_name && errors.last_name && (
              <p className="mt-1 text-sm text-red-500">{errors.last_name}</p>
            )}
          </div>

          <div>
            <input
              type="text"
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
              placeholder="ตั้งรหัสผ่าน"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className={getInputClassName("password")}
            />
            {touched.password && errors.password && (
              <p className="mt-1 text-sm text-red-500">{errors.password}</p>
            )}
          </div>

          <div>
            <input
              type="password"
              name="confirm_password"
              placeholder="ยืนยันรหัสผ่าน"
              value={formData.confirm_password}
              onChange={handleChange}
              onBlur={handleBlur}
              className={getInputClassName("confirm_password")}
            />
            {touched.confirm_password && errors.confirm_password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.confirm_password}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 px-4 bg-[#2DADC2] hover:bg-[#2597A9] text-white font-semibold rounded-lg transition duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isLoading ? "กำลังลงทะเบียน..." : "ลงทะเบียน"}
          </button>
        </form>

        <p className="mt-4 text-gray-600">
          มีบัญชีอยู่แล้ว?{" "}
          <button
            onClick={onSwitchToLogin}
            className="text-[#2DADC2] hover:underline"
          >
            เข้าสู่ระบบ
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
