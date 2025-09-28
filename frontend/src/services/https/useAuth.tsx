import { useEffect, useState } from "react";
import { getMe } from "./index";
import type { ProfileInterface } from "../../interface/profile";
export function useAuth() {
  const [user, setUser] = useState<ProfileInterface | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMe().then((data:any) => {
      setUser(data);
      setLoading(false);
    });
  }, []);

  return { user, loading, isLogin: !!user };
}