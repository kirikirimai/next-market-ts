import { useRouter } from "next/router";
import jwt from "jsonwebtoken";
import { useEffect, useState } from "react";

const secret_key = "nextmarket";

const useAuth = () => {
  const [loginuser, setLoginUser] = useState("");

  const router = useRouter();
  

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/user/login");
    }

    try {
      //トークンが有効だった場合はログインユーザーのメアドを保存しておく。
      const decoded = jwt.verify(token, secret_key);
      setLoginUser(decoded.email);
    } catch (error) {
      router.push("/user/login");
    }
  }, [router]);

  return loginuser
};

export default useAuth;
