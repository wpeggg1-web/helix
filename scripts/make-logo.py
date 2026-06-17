"""
HELIX logo + favicon generator.
DNA double helix mark: two interweaving sine waves (cyan + magenta).
"""
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import os, math

# Palette
CYAN    = (0, 212, 255)
CYAN_DIM= (0, 140, 180)
MAGENTA = (236, 72, 153)
MAGENTA_DIM = (160, 42, 107)
BG      = (10, 10, 14)
WHITE   = (255, 255, 255)


def helix_points(cx, cy, w, h, n_turns=1.5, samples=120, phase=0):
    """Return list of points along one strand of a DNA helix (in the given phase)."""
    pts = []
    for i in range(samples + 1):
        t = i / samples  # 0..1
        x = cx - w/2 + w * t
        # y oscillates with phase offset
        y = cy + (h/2) * math.sin(2 * math.pi * n_turns * t + phase)
        pts.append((x, y))
    return pts


def draw_helix_mark(img, cx, cy, size):
    """Draw the HELIX DNA helix mark centered at (cx, cy) with given diameter."""
    draw = ImageDraw.Draw(img, "RGBA")
    w = size * 0.78
    h = size * 0.62

    pts_a = helix_points(cx, cy, w, h, n_turns=2.5, phase=0)
    pts_b = helix_points(cx, cy, w, h, n_turns=2.5, phase=math.pi)

    # Glow
    glow = Image.new("RGBA", img.size, (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow)
    for p in pts_a:
        gd.ellipse([p[0]-size*0.04, p[1]-size*0.04, p[0]+size*0.04, p[1]+size*0.04], fill=(0, 212, 255, 80))
    for p in pts_b:
        gd.ellipse([p[0]-size*0.04, p[1]-size*0.04, p[0]+size*0.04, p[1]+size*0.04], fill=(236, 72, 153, 80))
    glow = glow.filter(ImageFilter.GaussianBlur(size * 0.04))
    img.alpha_composite(glow)

    draw = ImageDraw.Draw(img, "RGBA")

    # Draw the two strands
    stroke_w = max(3, int(size * 0.04))
    draw.line(pts_a, fill=CYAN, width=stroke_w, joint="curve")
    draw.line(pts_b, fill=MAGENTA, width=stroke_w, joint="curve")

    # Ladder rungs at the intersection points (where strands cross)
    # Find points where |y_a - y_b| is minimized (they cross)
    n_rungs = 11
    for k in range(n_rungs):
        t = (k + 0.5) / n_rungs
        idx = int(t * (len(pts_a) - 1))
        if idx < len(pts_a) and idx < len(pts_b):
            a = pts_a[idx]
            b = pts_b[idx]
            # gradient rung: blend cyan to magenta
            r = max(1, int(size * 0.022))
            draw.line([a, b], fill=(180, 100, 200, 220), width=r)
    return img


def gen_logo(size, out_path, transparent=True, with_glow=True):
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0) if transparent else BG + (255,))
    cx = cy = size / 2
    if with_glow and not transparent:
        # add a soft cyan-magenta gradient bg
        for y in range(size):
            t = y / size
            r = int(10 + (236 - 10) * t * 0.05)
            g = int(10 + (72 - 10) * t * 0.05)
            b = int(14 + (153 - 14) * t * 0.05)
            ImageDraw.Draw(img).line([(0, y), (size, y)], fill=(r, g, b, 255))
    draw_helix_mark(img, cx, cy, size * 0.85)
    img.save(out_path, "PNG", optimize=True)
    print(f"  {out_path}  {os.path.getsize(out_path):,}B  {size}x{size}")


def gen_favicon_ico(out_path):
    sizes = [16, 32, 48]
    images = []
    for s in sizes:
        img = Image.new("RGBA", (s, s), (0, 0, 0, 0))
        draw_helix_mark(img, s/2, s/2, s * 0.9)
        images.append(img)
    images[-1].save(
        out_path,
        format="ICO",
        sizes=[(i.width, i.height) for i in images],
        append_images=images[:-1],
    )
    print(f"  {out_path}  {os.path.getsize(out_path):,}B  multi: {sizes}")


def gen_apple_touch_icon(out_path):
    size = 180
    mask = Image.new("L", (size, size), 0)
    md = ImageDraw.Draw(mask)
    md.rounded_rectangle([0, 0, size, size], radius=int(size * 0.22), fill=255)
    bg = Image.new("RGB", (size, size), BG)
    out = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    out.paste(bg, (0, 0), mask)
    out = out.convert("RGBA")
    draw_helix_mark(out, size/2, size/2, size * 0.78)
    out.save(out_path, "PNG", optimize=True)
    print(f"  {out_path}  {os.path.getsize(out_path):,}B  {size}x{size}")


def gen_og_image(out_path):
    W, H = 1200, 630
    img = Image.new("RGB", (W, H), BG)
    draw = ImageDraw.Draw(img, "RGBA")

    # Subtle grid
    for x in range(0, W, 40):
        for y in range(0, H, 40):
            draw.ellipse([x-1, y-1, x+1, y+1], fill=(31, 31, 31))

    # Cyan radial glow upper-left, magenta lower-right
    glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow)
    for r in range(500, 0, -30):
        a = int(12 * (1 - r/500))
        gd.ellipse([150-r, 100-r, 150+r, 100+r], fill=(0, 212, 255, a))
    for r in range(500, 0, -30):
        a = int(10 * (1 - r/500))
        gd.ellipse([1050-r, 530-r, 1050+r, 530+r], fill=(236, 72, 153, a))
    glow = glow.filter(ImageFilter.GaussianBlur(80))
    img = Image.alpha_composite(img.convert("RGBA"), glow)
    draw = ImageDraw.Draw(img, "RGBA")

    # Mark on left
    mark_size = 360
    mark_img = Image.new("RGBA", (mark_size, mark_size), (0, 0, 0, 0))
    draw_helix_mark(mark_img, mark_size/2, mark_size/2, mark_size * 0.85)
    img.paste(mark_img, (90, 135), mark_img)

    # Wordmark
    F_HEAVY = "/System/Library/Fonts/Supplemental/Arial Black.ttf"
    F_REG   = "/System/Library/Fonts/Helvetica.ttc"
    F_MONO  = "/System/Library/Fonts/Supplemental/Courier New Bold.ttf"

    title = "HELIX"
    tfont = ImageFont.truetype(F_HEAVY, 140)
    # gradient text — draw twice with different colors and slight offset
    draw.text((542, 220), title, font=tfont, fill=(0, 212, 255, 200))
    draw.text((540, 218), title, font=tfont, fill=(237, 237, 237))
    # slight magenta shadow
    glow_t = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    gtd = ImageDraw.Draw(glow_t)
    gtd.text((540, 218), title, font=tfont, fill=(236, 72, 153, 120))
    glow_t = glow_t.filter(ImageFilter.GaussianBlur(20))
    img = Image.alpha_composite(img, glow_t)
    draw = ImageDraw.Draw(img, "RGBA")

    # Tagline
    draw.text((544, 385), "AI inference", font=ImageFont.truetype(F_REG, 32), fill=(200, 200, 200))
    draw.text((544, 422), "you can verify.", font=ImageFont.truetype(F_REG, 32), fill=(200, 200, 200))

    # Domain
    draw.text((544, 500), "helix-iota-eosin.vercel.app", font=ImageFont.truetype(F_MONO, 18), fill=(0, 212, 255))

    img.convert("RGB").save(out_path, "PNG", optimize=True)
    print(f"  {out_path}  {os.path.getsize(out_path):,}B  {W}x{H}")


# ============== MAIN ==============
print("Generating HELIX brand assets (DNA helix mark)...")
print()
gen_logo(1024, "/Users/muhammadnuran/helix/public/logo-1024.png", transparent=True, with_glow=True)
gen_logo(512,  "/Users/muhammadnuran/helix/public/logo-512.png",  transparent=True, with_glow=True)
gen_logo(256,  "/Users/muhammadnuran/helix/public/logo-256.png",  transparent=True, with_glow=True)
gen_logo(128,  "/Users/muhammadnuran/helix/public/logo-128.png",  transparent=True, with_glow=True)
gen_logo(32,   "/Users/muhammadnuran/helix/public/favicon-32.png",   transparent=True, with_glow=True)
gen_favicon_ico("/Users/muhammadnuran/helix/public/favicon.ico")
gen_apple_touch_icon("/Users/muhammadnuran/helix/public/apple-touch-icon.png")
gen_og_image("/Users/muhammadnuran/helix/public/og-image.png")
print()
print("Done.")
