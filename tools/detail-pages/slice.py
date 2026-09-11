"""
렌더 결과(out/<name>.png, 1720px 폭)를
  · 사이트용: public/images/detail/<name>-NN.jpg (1720px, 조각 ≤ 4000px) + lib/site.ts 에 넣을 JSON
  · 스마트스토어용: ~/Downloads/절굿대달토끼_상세페이지/<한글명>_NN.jpg (860px, 조각 ≤ 2000px) + 전체 한 장
로 자른다. 조각 경계는 섹션 경계에 가깝게 — 배경이 종이색인 행(거의 단색)에서만 자른다.
    python3 slice.py jeolgutdae 절굿대떡  gift 선물세트
"""
import json, os, sys
from PIL import Image

ROOT = "/Users/taegyun/naju-daltokki"
OUT = os.path.join(ROOT, "tools/detail-pages/out")
SITE = os.path.join(ROOT, "public/images/detail")
DL = os.path.expanduser("~/Downloads/절굿대달토끼_상세페이지")
os.makedirs(DL, exist_ok=True)

def uniform_rows(im, step=4):
    """행이 거의 단색(=사진·글자 없음)인지 — 표준편차로 판정."""
    import numpy as np
    a = np.asarray(im.convert("L"), dtype=np.int16)
    std = a.std(axis=1)
    return std < 3.0

def cut_points(im, max_h):
    ok = uniform_rows(im)
    H = im.height; cuts = [0]
    while H - cuts[-1] > max_h:
        target = cuts[-1] + max_h
        y = target
        while y > cuts[-1] + max_h * 0.6 and not ok[y]:
            y -= 1
        if y <= cuts[-1] + max_h * 0.6:
            y = target  # 단색 행이 없으면 그냥 자른다
        cuts.append(y)
    cuts.append(H)
    return cuts

args = sys.argv[1:]
for name, ko in zip(args[0::2], args[1::2]):
    full = Image.open(os.path.join(OUT, f"{name}.png")).convert("RGB")
    # 옛 조각 삭제
    for f in os.listdir(SITE):
        if f.startswith(name + "-") and f[len(name) + 1:].split(".")[0].isdigit():
            os.remove(os.path.join(SITE, f))
    # 사이트용 1720px
    cuts = cut_points(full, 4000)
    site_items = []
    for i in range(len(cuts) - 1):
        part = full.crop((0, cuts[i], full.width, cuts[i + 1]))
        fn = f"{name}-{i + 1:02d}.jpg"
        part.save(os.path.join(SITE, fn), quality=85, optimize=True, progressive=True)
        site_items.append({"src": f"/images/detail/{fn}", "width": part.width, "height": part.height})
    json.dump(site_items, open(os.path.join(OUT, f"{name}.site.json"), "w"), ensure_ascii=False)
    # 스토어용 860px
    small = full.resize((860, full.height // 2), Image.LANCZOS)
    cuts2 = cut_points(small, 2000)
    for i in range(len(cuts2) - 1):
        part = small.crop((0, cuts2[i], 860, cuts2[i + 1]))
        part.save(os.path.join(DL, f"{ko}_{i + 1:02d}.jpg"), quality=88, optimize=True, progressive=True)
    small.save(os.path.join(DL, f"{ko}_전체.jpg"), quality=88, optimize=True, progressive=True)
    print(name, "site", len(site_items), "pieces;", "store", len(cuts2) - 1, "pieces; full", small.size)
