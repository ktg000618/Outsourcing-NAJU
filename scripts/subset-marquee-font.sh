#!/usr/bin/env bash
# 홈 마퀴(쓰임새 낱말)용 윤곽선 폰트 서브셋.
# 가변 폰트는 text-stroke 를 걸면 획 겹침이 내부 선으로 드러나서, 겹침이 제거된
# 정적 Black 에서 마퀴에 쓰이는 글자만 뽑아 싣는다. lib/site.ts 의 occasions 가
# 바뀌면 다시 돌릴 것 — 빠진 글자는 가변 폰트로 떨어져 그 글자만 내부 선이 보인다.
set -euo pipefail
cd "$(dirname "$0")/.."
TEXT=$(python3 -c "
import re
s=open('lib/site.ts',encoding='utf-8').read()
words=set(re.findall(r'\"([^\"]+)\"', ''.join(re.findall(r'occasions: \[([^\]]*)\]', s))))
print(''.join(sorted(set(''.join(words)) - {' '})) + '·')")
echo "서브셋 글자: $TEXT"
pyftsubset node_modules/pretendard/dist/web/static/woff2/Pretendard-Black.woff2 \
  --text="$TEXT" --flavor=woff2 --no-hinting --desubroutinize \
  --output-file=public/fonts/pretendard-black-marquee.woff2
ls -l public/fonts/pretendard-black-marquee.woff2 | awk '{print $5" bytes"}'
