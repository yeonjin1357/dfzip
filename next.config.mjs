/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://api.neople.co.kr/df/:path*", // 실제 API 경로
      },
    ];
  },
  images: {
    domains: ["img-api.neople.co.kr"], // 이미지 호스트 도메인 추가
    formats: ["image/avif", "image/webp"], // 우선순위가 높은 포맷부터 명시
  },
};

export default nextConfig;
