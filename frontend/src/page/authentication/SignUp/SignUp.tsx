import React, { useState } from "react";
import dollar from "../../../assets/dollar.png";
import financialProfit from "../../../assets/financial-profit.png";
import { SetSignUp } from "../../../services/https";
import type { SignUpInterface } from "../../../interface/SignUp";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  [key: string]: string;
}

interface SignUpProps {
  onSwitchToLogin: () => void;
}

const SignUp: React.FC<SignUpProps> = ({ onSwitchToLogin }) => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
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

    if (!formData.firstName) {
      newErrors.firstName = "กรุณากรอกชื่อ";
    }

    if (!formData.lastName) {
      newErrors.lastName = "กรุณากรอกนามสกุล";
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

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "กรุณายืนยันรหัสผ่าน";
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "รหัสผ่านไม่ตรงกัน";
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
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        password: formData.password,
        confirm_password: formData.confirmPassword
      };

      try {
        const result = await SetSignUp(signUpData);
        if (result.success) {
          onSwitchToLogin();
        } else {
          setApiError(result.error || "เกิดข้อผิดพลาดในการลงทะเบียน");
        }
      } catch (error) {
        setApiError("เกิดข้อผิดพลาดในการเชื่อมต่อกับระบบ");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const getInputClassName = (fieldName: keyof FormData) => `
    w-full px-4 py-2 border rounded-lg transition-colors
    ${
      touched[fieldName] && errors[fieldName]
        ? "border-red-500 focus:outline-none focus:border-red-500"
        : "border-gray-300 focus:outline-none focus:border-[#2DADC2]"
    }
  `;

  return (
    <div className="flex min-h-screen">
      {/* Left Side - Image */}
      <div className="hidden md:flex md:w-1/2 bg-[#2DADC2] p-8 flex-col items-center justify-center text-white">
        <div className="flex items-center gap-4 mb-8">
          <img src={dollar} alt="Logo" className="w-16 h-16" />
          <h2 className="text-3xl font-bold">
            ยินดีต้อนรับเข้าสู่
            <br />
            ระบบจัดการการเงินส่วนบุคคล
          </h2>
        </div>
        <img src={financialProfit} alt="Financial" className="max-w-md w-full" />
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
              name="firstName"
              placeholder="ชื่อ"
              value={formData.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
              className={getInputClassName("firstName")}
            />
            {touched.firstName && errors.firstName && (
              <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>
            )}
          </div>

          <div>
            <input
              type="text"
              name="lastName"
              placeholder="นามสกุล"
              value={formData.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
              className={getInputClassName("lastName")}
            />
            {touched.lastName && errors.lastName && (
              <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>
            )}
          </div>

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
              name="confirmPassword"
              placeholder="ยืนยันรหัสผ่าน"
              value={formData.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              className={getInputClassName("confirmPassword")}
            />
            {touched.confirmPassword && errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>
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
          <button onClick={onSwitchToLogin} className="text-[#2DADC2] hover:underline">
            เข้าสู่ระบบ
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignUp;