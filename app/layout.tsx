import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";

import "./globals.css";

const noto = Noto_Sans_KR({ preload: false });

export const metadata: Metadata = {
  title: "던파집 - 던파의 모든 것",
  description: "캐릭터 정보, 랭킹, 경매장 정보를 포함한 모든 정보를 확인해보세요.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={noto.className}>
        <main>{children}</main>
      </body>
    </html>
  );
}
