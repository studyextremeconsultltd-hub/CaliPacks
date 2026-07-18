"""
Remove backgrounds and export UHD product shots on pure white.
Preserves cali-01..28 mapping via file-size match to CaliPacks Photos.
"""
from __future__ import annotations

import gc
import os
from pathlib import Path

from PIL import Image
from rembg import remove

SRC_DIR = Path(r"E:\Cali Packs\CaliPacks Photos")
OUT_DIR = Path(r"E:\Cali Packs\public\products")
SIZE = 2000
QUALITY = 95


def fit_on_white(img: Image.Image, size: int = SIZE, pad: int = 80) -> Image.Image:
    canvas = Image.new("RGB", (size, size), (255, 255, 255))
    max_w = size - pad * 2
    max_h = size - pad * 2
    img = img.convert("RGBA")
    # scale to fit
    ratio = min(max_w / img.width, max_h / img.height)
    new_size = (max(1, int(img.width * ratio)), max(1, int(img.height * ratio)))
    img = img.resize(new_size, Image.Resampling.LANCZOS)
    x = (size - img.width) // 2
    y = (size - img.height) // 2
    canvas.paste(img, (x, y), img)
    return canvas


def process_one(src: Path, out: Path) -> None:
    with Image.open(src) as im:
        im = im.convert("RGBA")
        # Downscale very large inputs first to save RAM
        longest = max(im.size)
        if longest > 1800:
            scale = 1800 / longest
            im = im.resize(
                (int(im.width * scale), int(im.height * scale)),
                Image.Resampling.LANCZOS,
            )
        cut = remove(im)
    result = fit_on_white(cut)
    result.save(out, "JPEG", quality=QUALITY, optimize=True, subsampling=0)
    print(f"OK {out.name} {result.size[0]}x{result.size[1]} {out.stat().st_size // 1024}KB")
    del cut, result
    gc.collect()


def main() -> None:
    sources = sorted(
        [p for p in SRC_DIR.iterdir() if p.suffix.lower() in {".jpg", ".jpeg", ".png"}],
        key=lambda p: p.name.lower(),
    )
    product_sources = [p for p in sources if "shop image" not in p.name.lower()]
    size_map = {p.stat().st_size: p for p in product_sources}

    # Prefer size match against ORIGINAL WhatsApp sizes recorded before UHD pass.
    # Current public files are already processed — rebuild from sorted WhatsApp
    # order matching the earlier successful size-map run (cali-01 = (1).jpeg etc).
    # Use the order from the successful process log:
    ordered_names = [
        "WhatsApp Image 2026-07-09 at 7.46.31 PM (1).jpeg",
        "WhatsApp Image 2026-07-09 at 7.46.31 PM (2).jpeg",
        "WhatsApp Image 2026-07-09 at 7.46.31 PM (3).jpeg",
        "WhatsApp Image 2026-07-09 at 7.46.31 PM (4).jpeg",
        "WhatsApp Image 2026-07-09 at 7.46.31 PM (5).jpeg",
        "WhatsApp Image 2026-07-09 at 7.46.31 PM.jpeg",
        "WhatsApp Image 2026-07-14 at 6.44.54 PM.jpeg",
        "WhatsApp Image 2026-07-14 at 6.44.55 PM.jpeg",
        "WhatsApp Image 2026-07-14 at 6.44.56 PM.jpeg",
        "WhatsApp Image 2026-07-14 at 6.44.58 PM.jpeg",
        "WhatsApp Image 2026-07-14 at 6.45.00 PM (1).jpeg",
        "WhatsApp Image 2026-07-14 at 6.45.00 PM.jpeg",
        "WhatsApp Image 2026-07-14 at 6.45.27 PM (1).jpeg",
        "WhatsApp Image 2026-07-14 at 6.45.27 PM (2).jpeg",
        "WhatsApp Image 2026-07-14 at 6.45.27 PM (3).jpeg",
        "WhatsApp Image 2026-07-14 at 6.45.27 PM (4).jpeg",
        "WhatsApp Image 2026-07-14 at 6.45.27 PM (5).jpeg",
        "WhatsApp Image 2026-07-14 at 6.45.27 PM.jpeg",
        "WhatsApp Image 2026-07-14 at 6.45.28 PM (1).jpeg",
        "WhatsApp Image 2026-07-14 at 6.45.28 PM (2).jpeg",
        "WhatsApp Image 2026-07-14 at 6.45.28 PM (3).jpeg",
        "WhatsApp Image 2026-07-14 at 6.45.28 PM (4).jpeg",
        "WhatsApp Image 2026-07-14 at 6.45.28 PM (5).jpeg",
        "WhatsApp Image 2026-07-14 at 6.45.28 PM (6).jpeg",
        "WhatsApp Image 2026-07-14 at 6.45.28 PM (7).jpeg",
        "WhatsApp Image 2026-07-14 at 6.45.28 PM.jpeg",
        "WhatsApp Image 2026-07-14 at 6.45.29 PM (1).jpeg",
        "WhatsApp Image 2026-07-14 at 6.45.29 PM.jpeg",
    ]

    print(f"Processing {len(ordered_names)} images with rembg -> white UHD...")
    for i, name in enumerate(ordered_names, start=1):
        src = SRC_DIR / name
        if not src.exists():
            print(f"SKIP missing {name}")
            continue
        out = OUT_DIR / f"cali-{i:02d}.jpg"
        try:
            process_one(src, out)
        except Exception as exc:  # noqa: BLE001
            print(f"FAIL {out.name}: {exc}")
            gc.collect()

    shop = next((p for p in sources if "shop image" in p.name.lower()), None)
    if shop:
        try:
            process_one(shop, OUT_DIR / "shop-hero.jpg")
        except Exception as exc:  # noqa: BLE001
            print(f"FAIL shop-hero: {exc}")

    print("DONE")


if __name__ == "__main__":
    main()
