"""
HELIX X (Twitter) profile banner.
Specs: 1500x500
- Mobile safe zone: middle 360px (y=70..430)
- Profile pic overlap: bottom-left circle ~200x200 at (40, 280)
"""
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import os, math

# DNA helix mark (inlined)
CYAN    = (0, 212, 255)
MAGENTA = (236, 72, 153)
AMBER   = (232, 160, 64)
GREEN   = (74, 222, 128)
WHITE   = (237, 237, 237)
GRAY    = (138, 138, 138)
DIM     = (90, 90, 90)
GRID    = (31, 31, 31)
BG_TOP  = (5, 5, 8)
BG_BOT  = (10, 10, 14)


def _helix_points(cx, cy, w, h, n_turns=2.5, samples=120, phase=0):
    pts = []
    for i in range(samples + 1):
        t = i / samples
        x = cx - w/2 + w * t
        y = cy + (h/2) * math.sin(2 * math.pi * n_turns * t + phase)
        pts.append((x, y))
    return pts


def draw_helix_mark(img, cx, cy, size):
    draw = ImageDraw.Draw(img, "RGBA")
    w = size * 0.78
    h = size * 0.62
    pts_a = _helix_points(cx, cy, w, h, n_turns=2.5, phase=0)
    pts_b = _helix_points(cx, cy, w, h, n_turns=2.5, phase=math.pi)
    glow = Image.new("RGBA", img.size, (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow)
    for p in pts_a:
        gd.ellipse([p[0]-size*0.04, p[1]-size*0.04, p[0]+size*0.04, p[1]+size*0.04], fill=(0, 212, 255, 80))
    for p in pts_b:
        gd.ellipse([p[0]-size*0.04, p[1]-size*0.04, p[0]+size*0.04, p[1]+size*0.04], fill=(236, 72, 153, 80))
    glow = glow.filter(ImageFilter.GaussianBlur(size * 0.04))
    img.alpha_composite(glow)
    draw = ImageDraw.Draw(img, "RGBA")
    stroke_w = max(3, int(size * 0.04))
    draw.line(pts_a, fill=CYAN, width=stroke_w, joint="curve")
    draw.line(pts_b, fill=MAGENTA, width=stroke_w, joint="curve")
    n_rungs = 11
    for k in range(n_rungs):
        t = (k + 0.5) / n_rungs
        idx = int(t * (len(pts_a) - 1))
        if idx < len(pts_a) and idx < len(pts_b):
            a = pts_a[idx]
            b = pts_b[idx]
            r = max(1, int(size * 0.02))
            draw.line([a, b], fill=(180, 100, 200, 200), width=r)
    return img


# Fonts
F_HEAVY = "/System/Library/Fonts/Supplemental/Arial Black.ttf"
F_REG   = "/System/Library/Fonts/Helvetica.ttc"
F_MONO  = "/System/Library/Fonts/Supplemental/Courier New Bold.ttf"


def font(path, size):
    return ImageFont.truetype(path, size)


W, H = 1500, 500

# ============== BUILD ==============

# 1. Background gradient
img = Image.new("RGB", (W, H), BG_BOT)
draw = ImageDraw.Draw(img, "RGBA")
for y in range(H):
    t = y / H
    r = int(BG_TOP[0] * (1 - t) + BG_BOT[0] * t)
    g = int(BG_TOP[1] * (1 - t) + BG_BOT[1] * t)
    b = int(BG_TOP[2] * (1 - t) + BG_BOT[2] * t)
    draw.line([(0, y), (W, y)], fill=(r, g, b))

# 2. Subtle grid
for x in range(0, W, 28):
    for y in range(0, H, 28):
        draw.ellipse([x-1, y-1, x+1, y+1], fill=GRID)

# 3. Radial glows (left + right)
glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
gd = ImageDraw.Draw(glow)
for r in range(420, 0, -30):
    a = int(15 * (1 - r/420))
    gd.ellipse([400-r, 200-r, 400+r, 200+r], fill=(0, 212, 255, a))
for r in range(380, 0, -30):
    a = int(12 * (1 - r/380))
    gd.ellipse([1150-r, 250-r, 1150+r, 250+r], fill=(236, 72, 153, a))
glow = glow.filter(ImageFilter.GaussianBlur(60))
img = Image.alpha_composite(img.convert("RGBA"), glow)
draw = ImageDraw.Draw(img, "RGBA")


# 4. HELIX wordmark — left-center, ABOVE the profile pic overlap (y=80-200)
# Profile pic covers (40, 280) to (240, 480), so we put wordmark starting at x=320 (right of PP)
title = "HELIX"
tfont = font(F_HEAVY, 130)


def draw_gradient_text(text, xy, font, color_a, color_b):
    x, y = xy
    bbox = draw.textbbox((0, 0), text, font=font)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    tmp = Image.new("RGBA", (tw + 20, th + 20), (0, 0, 0, 0))
    td = ImageDraw.Draw(tmp)
    td.text((10 - bbox[0], 10 - bbox[1]), text, font=font, fill=(255, 255, 255, 255))
    mask = tmp.split()[3]
    grad = Image.new("RGB", (tw + 20, th + 20), color_a)
    gd2 = ImageDraw.Draw(grad)
    for ix in range(tw + 20):
        t = ix / (tw + 20)
        r = int(color_a[0] * (1-t) + color_b[0] * t)
        g = int(color_a[1] * (1-t) + color_b[1] * t)
        b = int(color_a[2] * (1-t) + color_b[2] * t)
        gd2.line([(ix, 0), (ix, th + 20)], fill=(r, g, b))
    out = Image.composite(grad, Image.new("RGB", grad.size, color_a), mask)
    img.paste(out, (x - 10, y - 10))

# Place HELIX at safe position (right of profile pic, vertically centered in mobile-safe zone)
draw_gradient_text("HELIX", (320, 100), tfont, CYAN, MAGENTA)

# 5. Tagline below wordmark
draw.text((325, 250), "AI inference you can verify.", font=font(F_REG, 26), fill=GRAY)
# Stats line — kept short, above PP area
draw.text((325, 295), "4,218 nodes  ·  12.8M inferences  ·  99.4% pass rate", font=font(F_MONO, 16), fill=CYAN)


# 6. DNA helix — right side (not overlapping anything critical)
helix_size = 280
helix_cx = 1200
helix_cy = 230
draw_helix_mark(img, helix_cx, helix_cy, helix_size)


# 7. Subtle profile-pic-zone indicator (very faint, just a hint of where PP will sit)
# Skip — would be ugly. Let user position PP manually.


# 8. Bottom right (away from PP) — version pill
def pill(d, x, y, w, h, text, fc, bg):
    r = h // 2
    d.rounded_rectangle([x, y, x+w, y+h], radius=r, fill=bg)
    d.text((x + w//2, y + h//2), text, font=font(F_HEAVY, 16), fill=fc, anchor="mm")

pill(draw, W-200, 410, 140, 34, "v0.1.0 · Base", (0, 0, 0), MAGENTA)


# 9. Accent lines (top + bottom of safe area)
draw.line([(0, 30), (W, 30)], fill=(236, 72, 153, 80), width=1)
draw.line([(0, H-30), (W, H-30)], fill=(0, 212, 255, 80), width=1)


# 10. Save
out = "/Users/muhammadnuran/helix/public/x-profile-banner.png"
img.convert("RGB").save(out, "PNG", optimize=True)
print("OK:", out, os.path.getsize(out), "bytes")
