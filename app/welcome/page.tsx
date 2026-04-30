"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Welcome() {
  const router = useRouter();
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    const storedData = localStorage.getItem("userData");
    if (storedData) {
      setUser(JSON.parse(storedData));
    } else {
      router.push("/login");
    }
  }, [router]);

  function handleLogout() {
    localStorage.removeItem("userData");
    alert("로그아웃 되었습니다.");
    router.push("/");
  }

  if (!user) return null; // 로딩 중이거나 리다이렉트 중

  return (
    <div className="container">
      <h1>로그인 성공!</h1>
      <p className="subtitle" id="welcome-message">
        환영합니다, {user.name}님.
      </p>

      <div
        className="user-info"
        style={{
          marginBottom: "30px",
          padding: "20px",
          background: "rgba(255,255,255,0.05)",
          borderRadius: "12px",
          textAlign: "left",
        }}
      >
        <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
          이메일: <span style={{ color: "var(--white)" }}>{user.email}</span>
        </p>
      </div>

      <button type="button" onClick={handleLogout} style={{ background: "var(--secondary)" }}>
        로그아웃
      </button>
    </div>
  );
}
