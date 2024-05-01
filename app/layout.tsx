import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";

import Header from "./_components/Header";
import "./globals.css";

const noto = Noto_Sans_KR({ preload: false });

export const metadata: Metadata = {
  title: "DFZIP - 던파의 모든 것",
  description: "캐릭터 정보, 랭킹, 경매장 정보를 포함한 모든 정보를 확인해보세요.",
  icons: {
    icon: "/icons/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={noto.className}>
        <Header></Header>
        <main>{children}</main>
      </body>
    </html>
  );
}
