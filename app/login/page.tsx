"use client";

import { useRouter } from "next/navigation";
import { loginUser } from "@/app/actions";
import Link from "next/link";

export default function Login() {
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    const res = await loginUser(formData);
    if (res.error) {
      alert(res.error);
    } else if (res.success && res.user) {
      alert(`${res.user.name}님, 환영합니다!`);
      localStorage.setItem("userData", JSON.stringify(res.user));
      router.push("/welcome");
    }
  }

  return (
    <div className="container">
      <h1>다시 오신 것을 환영합니다</h1>
      <p className="subtitle">세부 정보를 입력하여 로그인해 주세요.</p>

      <form action={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">이메일 주소</label>
          <input type="email" id="email" name="email" placeholder="name@company.com" required />
        </div>

        <div className="form-group">
          <label htmlFor="password">비밀번호</label>
          <input type="password" id="password" name="password" placeholder="••••••••" required />
        </div>

        <button type="submit">로그인</button>
      </form>

      <div className="footer">
        계정이 없으신가요? <Link href="/signup">무료로 가입하세요</Link><br />
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
