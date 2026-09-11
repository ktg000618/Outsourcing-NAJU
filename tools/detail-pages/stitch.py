"""render.mjs 가 남긴 조각(out/<name>.partN.png)을 out/<name>.png 한 장으로 잇는다.  python3 stitch.py jeolgutdae gift"""
import json, os, sys
from PIL import Image

base = os.path.join(os.path.dirname(os.path.abspath(__file__)), "out")
for name in sys.argv[1:]:
    meta = json.load(open(os.path.join(base, f"{name}.parts.json")))
    s = meta["scale"]
    full = Image.new("RGB", (860 * s, meta["height"] * s), "white")
    y = 0
    for p in meta["parts"]:
        im = Image.open(p["file"]).convert("RGB")
        full.paste(im, (0, y)); y += im.height
        os.remove(p["file"])
    full.save(os.path.join(base, f"{name}.png"))
    print(name, full.size)
