"use client";

import { useRouter } from "next/navigation";
import { registerUser } from "@/app/actions";
import Link from "next/link";

export default function Signup() {
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirm-password") as string;

    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    const res = await registerUser(formData);
    if (res.error) {
      alert(res.error);
    } else if (res.success && res.user) {
      alert("회원가입이 완료되었습니다!");
      router.push("/login");
    }
  }

  return (
    <div className="container">
      <h1>계정 생성</h1>
      <p className="subtitle">오늘 바로 가입하세요! 언제나 무료입니다.</p>

      <form action={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">전체 이름</label>
          <input type="text" id="name" name="name" placeholder="홍길동" required />
        </div>

        <div className="form-group">
          <label htmlFor="email">이메일 주소</label>
          <input type="email" id="email" name="email" placeholder="name@company.com" required />
        </div>

        <div className="form-group">
          <label htmlFor="password">비밀번호</label>
          <input type="password" id="password" name="password" placeholder="••••••••" required />
        </div>

        <div className="form-group">
          <label htmlFor="confirm-password">비밀번호 확인</label>
          <input type="password" id="confirm-password" name="confirm-password" placeholder="••••••••" required />
        </div>

        <button type="submit">계정 생성</button>
      </form>

      <div className="footer">
        이미 계정이 있으신가요? <Link href="/login">여기서 로그인하세요</Link><br />
        <button
          type="button"
          onClick={() => router.push("/")}
          style={{
            marginTop: "10px",
            background: "transparent",
            color: "var(--text-muted)",
            border: "1px solid var(--glass-border)",
            fontSize: "0.8rem",
            padding: "8px",
          }}
        >
          홈으로 돌아가기
        </button>
      </div>
    </div>
  );
}
