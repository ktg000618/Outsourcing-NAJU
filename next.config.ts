import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* 정식 주소는 절굿대달토끼.kr (퓨니코드 xn--mf0bs0dqvcjcs95kebm.kr, 2026-10-07 연결). 옛 vercel.app 주소로 오면 같은 경로로 영구 이동 — 검색엔진이 둘을 다른 사이트로 세지 않게. */
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "naju-daltokki.vercel.app" }],
        destination: "https://xn--mf0bs0dqvcjcs95kebm.kr/:path*",
        permanent: true,
      },
    ];
  },
  images: {
    // Next 16 부터 images.qualities 기본값이 [75] 로 좁혀졌다. 목록에 없는 quality 는
    // 조용히 가장 가까운 허용값으로 내려앉는다 — 즉 코드의 quality={88}·{92} 가
    // 전부 75 로 압축돼 나가고 있었다. 원본이 이미 무른 사진들이라 이 차이가 보인다.
    qualities: [75, 78, 80, 82],
    // AVIF 를 먼저 — 같은 화질에 WebP 보다 20~30% 작다. 첫 요청 변환은 느리지만 결과가 31일 캐시된다.
    formats: ["image/avif", "image/webp"],
    // 최적화 결과를 31일 캐시 — 기본 60초라 방문마다 다시 변환해 사진이 늦게 떴다.
    minimumCacheTTL: 2678400,
    // 소식 사진은 Supabase 스토리지(공개 버킷)에서 온다.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      { protocol: "https", hostname: "staticmap.kakao.com" },
    ],
  },
};

export default nextConfig;
