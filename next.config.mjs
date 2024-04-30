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
  },
};

export default nextConfig;
