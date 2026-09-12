"use client";

import Image from "next/image";
import { useState } from "react";

/**
 * 소식 사진 타일. 직원이 올리는 사진은 비율이 제각각이라(세로 인물·서류·가로 풍경) 4:3 칸에
 * 그냥 채우면 머리나 서류 위아래가 잘린다. 사진이 칸 비율과 15% 넘게 다르면 통째로 보이게(contain)
 * 바꾸고, 남는 자리는 같은 사진을 흐리게 깔아 빈 띠가 보이지 않게 한다.
 * 첫 렌더는 cover — 서버는 사진 크기를 모른다. 로드되는 순간 한 번만 판단한다.
 */
export function NewsPhoto({
  src,
  alt,
  sizes,
  priority = false,
  /** 칸 비율(가로/세로). 목록·글 페이지 타일은 4:3. */
  frame = 4 / 3,
}: {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  frame?: number;
}) {
  const [contain, setContain] = useState(false);
  return (
    <>
      {contain && (
        <Image
          src={src}
          alt=""
          aria-hidden
          fill
          sizes={sizes}
          quality={40}
          className="scale-110 object-cover blur-xl saturate-75"
        />
      )}
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        quality={80}
        onLoad={(e) => {
          const img = e.currentTarget;
          if (!img.naturalWidth || !img.naturalHeight) return;
          const ratio = img.naturalWidth / img.naturalHeight;
          if (Math.abs(ratio / frame - 1) > 0.15) setContain(true);
        }}
        className={contain ? "object-contain" : "object-cover"}
      />
    </>
  );
}
