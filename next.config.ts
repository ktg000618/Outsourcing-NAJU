import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Next 16 부터 images.qualities 기본값이 [75] 로 좁혀졌다. 목록에 없는 quality 는
    // 조용히 가장 가까운 허용값으로 내려앉는다 — 즉 코드의 quality={88}·{92} 가
    // 전부 75 로 압축돼 나가고 있었다. 원본이 이미 무른 사진들이라 이 차이가 보인다.
    qualities: [75, 88, 92],
    // 소식 사진은 Supabase 스토리지(공개 버킷)에서 온다.
    remotePatterns: [{ protocol: "https", hostname: "*.supabase.co", pathname: "/storage/v1/object/public/**" }],
  },
};

export default nextConfig;
