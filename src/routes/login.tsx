import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { loginFn } from "@/lib/cms-server";
import cmsCss from "@/components/cms/cms-dashboard.css?url";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [{ title: "Avalook CMS — Đăng nhập" }],
    links: [{ rel: "stylesheet", href: cmsCss }],
  }),
  component: Login,
});

function Login() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await loginFn({ data: { password } });
      if (res.ok) {
        navigate({ to: "/dashboard" });
      } else {
        setError(res.error ?? "Đăng nhập thất bại.");
      }
    } catch {
      setError("Lỗi máy chủ. Thử lại.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="cms-app cms-login-wrap">
      <form className="cms-login" onSubmit={submit}>
        <div className="cms-login-brand">
          <span className="cms-dot">A</span> Avalook CMS
        </div>
        <h1>Đăng nhập</h1>
        <label className="cms-field-label" htmlFor="cms-pw">
          Mật khẩu
        </label>
        <input
          id="cms-pw"
          className="cms-input"
          type="password"
          value={password}
          autoFocus
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="cms-login-error">{error}</p>}
        <button className="cms-btn cms-btn-primary" disabled={busy || !password}>
          {busy ? "Đang vào…" : "Đăng nhập"}
        </button>
      </form>
    </div>
  );
}
