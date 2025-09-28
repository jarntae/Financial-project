import { apiUrl } from "../../utils/authHeaders";
import type { LoginInterface } from "../../interface/login";
import type { SignUpInterface } from "../../interface/SignUp";
async function SetLogin(data: LoginInterface) {
  try {
    const res = await fetch(`${apiUrl}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // สำคัญ!
      // ไม่ต้องใส่ Authorization header แล้ว
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (res.ok) {

      return {
        success: true,
        role: result.role,
      };
    } else {
      return {
        status: res.status,
        error: result.error || "เกิดข้อผิดพลาดในการเข้าสู่ระบบ",
      };
    }
  } catch (err) {
    console.error(err);
    return {
      status: 500,
      error: "เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์",
    };
  }
}

async function SetSignUp(data: SignUpInterface) {
  try {
    const res = await fetch(`${apiUrl}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // สำคัญ!
      // ไม่ต้องใส่ Authorization header แล้ว
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (res.ok) {

      return {
        success: true,
        role: result.role,
      };
    } else {
      return {
        status: res.status,
        error: result.error || "เกิดข้อผิดพลาดในการสมัครสมาชิก",
      };
    }
  } catch (err) {
    console.error(err);
    return {
      status: 500,
      error: "เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์",
    };
  }
}
async function SetLogOut() {
  try {
    const res = await fetch(`${apiUrl}/auth/logout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", 
    });
    const result = await res.json();
    if (res.ok) {

      return {
        success: true,
        message: result.message,
      };
    } else {
      return {
        status: res.status,
        error: result.error || "เกิดข้อผิดพลาดในการเข้าออกจากระบบ",
      };
    }
  } catch (err) {
    console.error(err);
    return {
      status: 500,
      error: "เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์",
    };
  }
}
async function getMe() {
  try {
    const res = await fetch(`${apiUrl}/api/me`, {
      method: "GET",
      credentials: "include", // สำคัญ!
    });
    if (!res.ok) throw new Error("Unauthorized");
    return await res.json();
  } catch (err) {
    return null;
  }
}

export { 
    SetLogin,
    SetLogOut,
    SetSignUp,
    getMe,
 };
