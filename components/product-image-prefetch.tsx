import { getImageProps } from "next/image";
import type { Product } from "@/lib/site";

/**
 * 목록에서 상세로 넘어갈 때 큰 원이 회색으로 비었다가 사진이 뜨는 구간을 없앤다.
 * 상세 히어로와 똑같은 srcset·sizes·quality 로 미리 받아 두면 전환 순간 캐시에서 바로 나온다.
 * 상세 히어로의 sizes/quality 와 짝으로 맞춘다 — 어긋나면 다른 URL 이라 소용없다.
 */
export const HERO_SIZES = "(min-width: 1024px) 440px, 90vw";
export const HERO_QUALITY = 80;

export function ProductImagePrefetch({
  products,
}: {
  products: readonly Product[];
}) {
  return (
    <>
      {products.map((p) => {
        const { props } = getImageProps({
          src: p.image,
          alt: "",
          fill: true,
          sizes: HERO_SIZES,
          quality: HERO_QUALITY,
        });
        return (
          <link
            key={p.slug}
            rel="prefetch"
            as="image"
            imageSrcSet={props.srcSet}
            imageSizes={props.sizes}
          />
        );
      })}
    </>
  );
}
