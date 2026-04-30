"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="container">
      <h1>프리미엄 앱</h1>
      <p className="subtitle">차세대 애플리케이션 관리를 경험해보세요.</p>

      <div className="actions" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <button type="button" onClick={() => router.push("/login")}>
          로그인
        </button>
        <button type="button" onClick={() => router.push("/signup")} style={{ background: "var(--secondary)" }}>
          회원가입
        </button>
      </div>

      <div className="footer">다양한 기능을 탐색하고 지금 바로 시작하세요.</div>
    </div>
  );
}
