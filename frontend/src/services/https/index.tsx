import { apiUrl, getAuthHeaders } from "../../utils/authHeaders";
import type {LoginInterface} from "../../interface/login";
async function SetLogin(data: LoginInterface) {
    try{
        const res = await fetch(`${apiUrl}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        const result = await res.json();
        if (res.ok) {
            localStorage.setItem("isLogin", "true");
            localStorage.setItem("role", result.role);
            localStorage.setItem("token", result.token);
            localStorage.setItem("token_type", result.token_type || "Bearer");
            return {
                success: true,
                role: result.role,
                token: result.token,
                token_type: result.token_type || "Bearer"
            };
        }else{
            return{
                status: res.status,
                error: result.error || "เกิดข้อผิดพลาดในการเข้าสู่ระบบ",
            }
        }
    }catch (err) {
        console.error(err);
        return{
            status: 500,
            error: "เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์",
        }
    }
}

export { SetLogin };