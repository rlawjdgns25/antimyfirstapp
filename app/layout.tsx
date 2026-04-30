import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "프리미엄 앱",
  description: "차세대 애플리케이션 관리를 경험해보세요.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        {children}
      </body>
    </html>
  );
}
