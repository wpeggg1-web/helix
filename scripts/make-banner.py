"""
HELIX launch banner (1500x500).
DNA helix mark on right + HELIX wordmark on left + stats strip.
"""
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import os, math

# --- DNA helix mark (inlined) ---
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


def _helix_points(cx, cy, w, h, n_turns=1.5, samples=120, phase=0):
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


# --- Fonts ---
F_HEAVY = "/System/Library/Fonts/Supplemental/Arial Black.ttf"
F_REG   = "/System/Library/Fonts/Helvetica.ttc"
F_MONO  = "/System/Library/Fonts/Supplemental/Courier New Bold.ttf"

W, H = 1500, 500


def font(path, size):
    return ImageFont.truetype(path, size)


# 1. Background gradient
img = Image.new("RGB", (W, H), BG_BOT)
draw = ImageDraw.Draw(img, "RGBA")
for y in range(H):
    t = y / H
    r = int(BG_TOP[0] * (1 - t) + BG_BOT[0] * t)
    g = int(BG_TOP[1] * (1 - t) + BG_BOT[1] * t)
    b = int(BG_TOP[2] * (1 - t) + BG_BOT[2] * t)
    draw.line([(0, y), (W, y)], fill=(r, g, b))

# Grid
for x in range(0, W, 28):
    for y in range(0, H, 28):
        draw.ellipse([x-1, y-1, x+1, y+1], fill=GRID)

# Cyan radial glow (left) + magenta radial glow (right)
glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
gd = ImageDraw.Draw(glow)
for r in range(420, 0, -30):
    a = int(15 * (1 - r/420))
    gd.ellipse([300-r, 250-r, 300+r, 250+r], fill=(0, 212, 255, a))
for r in range(380, 0, -30):
    a = int(12 * (1 - r/380))
    gd.ellipse([1200-r, 250-r, 1200+r, 250+r], fill=(236, 72, 153, a))
glow = glow.filter(ImageFilter.GaussianBlur(60))
img = Image.alpha_composite(img.convert("RGBA"), glow)
draw = ImageDraw.Draw(img, "RGBA")


# 2. Top-right version pill
def pill(d, x, y, w, h, text, fc, bg):
    r = h // 2
    d.rounded_rectangle([x, y, x+w, y+h], radius=r, fill=bg)
    d.text((x + w//2, y + h//2), text, font=font(F_HEAVY, 18), fill=fc, anchor="mm")

pill(draw, W-180, 50, 120, 38, "v0.1.0", (0, 0, 0), MAGENTA)


# 3. Main wordmark with gradient (cyan → magenta)
title = "HELIX"
tfont = font(F_HEAVY, 180)


def draw_gradient_text(d, xy, text, font, color_a, color_b, direction='horizontal'):
    """Draw text with horizontal or vertical gradient."""
    x, y = xy
    # get text bounding box
    bbox = d.textbbox((0, 0), text, font=font)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    # render text on a temp image, then composite with gradient
    tmp = Image.new("RGBA", (tw + 20, th + 20), (0, 0, 0, 0))
    td = ImageDraw.Draw(tmp)
    td.text((10 - bbox[0], 10 - bbox[1]), text, font=font, fill=(255, 255, 255, 255))
    mask = tmp.split()[3]
    grad = Image.new("RGB", (tw + 20, th + 20), color_a)
    gd2 = ImageDraw.Draw(grad)
    if direction == 'horizontal':
        for ix in range(tw + 20):
            t = ix / (tw + 20)
            r = int(color_a[0] * (1-t) + color_b[0] * t)
            g = int(color_a[1] * (1-t) + color_b[1] * t)
            b = int(color_a[2] * (1-t) + color_b[2] * t)
            gd2.line([(ix, 0), (ix, th + 20)], fill=(r, g, b))
    out = Image.composite(grad, Image.new("RGB", grad.size, color_a), mask)
    img.paste(out, (x - 10, y - 10))

draw_gradient_text(draw, (60, 150), title, tfont, CYAN, MAGENTA, 'horizontal')

# 4. Tagline + stats
draw.text((68, 360), "AI inference you can verify.", font=font(F_REG, 28), fill=GRAY)
stats_line = "4,218 nodes  ·  12.8M inferences  ·  99.4% pass rate  ·  $0.0008 / call"
draw.text((68, 408), stats_line, font=font(F_MONO, 18), fill=CYAN)


# 5. Right side: 3 floating inference log cards
def card_render(d, x, y, w, h, id_, node, model, verdict, verdict_color):
    sh = Image.new("RGBA", (w+20, h+20), (0, 0, 0, 0))
    sd = ImageDraw.Draw(sh)
    sd.rounded_rectangle([10, 10, w+10, h+10], radius=12, fill=(0, 0, 0, 180))
    sh = sh.filter(ImageFilter.GaussianBlur(12))
    img.alpha_composite(sh, (x-10, y-10))
    d.rounded_rectangle([x, y, x+w, y+h], radius=12, fill=(14, 14, 18), outline=MAGENTA, width=1)
    d.text((x+14, y+12), id_, font=font(F_MONO, 12), fill=DIM)
    d.text((x+14, y+30), node, font=font(F_HEAVY, 16), fill=WHITE)
    d.text((x+14, y+52), model, font=font(F_MONO, 11), fill=GRAY)
    vw, vh = 64, 26
    vx, vy = x + w - vw - 12, y + h - vh - 12
    d.rounded_rectangle([vx, vy, vx+vw, vy+vh], radius=6, fill=verdict_color)
    d.text((vx+vw//2, vy+vh//2), verdict, font=font(F_HEAVY, 14), fill=(5, 5, 8), anchor="mm")

def rotated_card(x, y, w, h, id_, node, model, verdict, vcolor, angle):
    tmp = Image.new("RGBA", (w+40, h+40), (0, 0, 0, 0))
    td = ImageDraw.Draw(tmp)
    card_render(td, 20, 20, w, h, id_, node, model, verdict, vcolor)
    rot = tmp.rotate(angle, resample=Image.BICUBIC, expand=True)
    img.alpha_composite(rot, (x - 20, y - 20))

cw, ch = 240, 105
rotated_card(1020,  50,  cw, ch, "inf_a3f9", "atlas-cluster-1",  "gpt-4-turbo",   "PASS",  GREEN,   -3)
rotated_card(1230, 165, cw, ch, "inf_a3fd", "frankfurt-x9",     "mistral-large", "DENY",  AMBER,    2)
rotated_card(1010, 285, cw, ch, "inf_a402", "seoul-prime-3",    "claude-sonnet", "PASS",  GREEN,   -2)


# 6. Decorative crosshair
def crosshair(d, cx, cy, size, color):
    d.line([(cx-size, cy), (cx+size, cy)], fill=color, width=2)
    d.line([(cx, cy-size), (cx, cy+size)], fill=color, width=2)
    d.ellipse([cx-size//2, cy-size//2, cx+size//2, cy+size//2], outline=color, width=2)
    d.ellipse([cx-3, cy-3, cx+3, cy+3], fill=color)

crosshair(draw, 1430, 100, 26, (236, 72, 153, 120))
crosshair(draw, 980,  445, 18, (0, 212, 255,  90))


# 7. Footer
foot = "Base  ·  pre-launch  ·  v0.1.0"
draw.text((W-65, 460), foot, font=font(F_MONO, 16), fill=GRAY, anchor="rm")
draw.text((60, 460), "INFERENCE ORACLE", font=font(F_HEAVY, 14), fill=MAGENTA)


# 8. Accent lines
draw.line([(0, 30), (W, 30)], fill=(236, 72, 153, 60), width=1)
draw.line([(0, H-30), (W, H-30)], fill=(0, 212, 255, 60), width=1)


# 9. Save
out = "/Users/muhammadnuran/helix/public/banner.png"
img.convert("RGB").save(out, "PNG", optimize=True)
print("OK:", out, os.path.getsize(out), "bytes")
