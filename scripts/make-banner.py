"""
AEGIS launch banner generator.
Output: 1500x500 PNG, PRXVT cyan + Charon amber aesthetic.
"""
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import os

W, H = 1500, 500

# Fonts (macOS system)
F_HEAVY = "/System/Library/Fonts/Supplemental/Arial Black.ttf"
F_BOLD  = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"
F_REG   = "/System/Library/Fonts/Helvetica.ttc"
F_MONO  = "/System/Library/Fonts/Supplemental/Courier New Bold.ttf"

# Palette (PRXVT cyan + Charon amber)
BG_TOP  = (5, 5, 8)
BG_BOT  = (10, 10, 14)
CYAN    = (0, 212, 255)    # PRXVT signature
CYAN_HI = (110, 235, 255)
AMBER   = (232, 160, 64)    # Charon signature
MAGENTA = (236, 72, 153)    # accent
WHITE   = (237, 237, 237)
GRAY    = (138, 138, 138)
DIM     = (90, 90, 90)
GREEN   = (74, 222, 128)
RED     = (248, 113, 113)
GRID    = (31, 31, 31)


def font(path, size):
    return ImageFont.truetype(path, size)


# ---------- 1. Background gradient ----------
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

# Cyan radial glow
glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
gdraw = ImageDraw.Draw(glow)
for r in range(420, 0, -30):
    a = int(20 * (1 - r/420))
    gdraw.ellipse([460-r, 250-r, 460+r, 250+r], fill=(0, 212, 255, a))
glow = glow.filter(ImageFilter.GaussianBlur(60))
img = Image.alpha_composite(img.convert("RGBA"), glow)
draw = ImageDraw.Draw(img, "RGBA")


# ---------- 2. Top-right LIVE pill ----------
def pill(d, x, y, w, h, text, fc, bg):
    r = h // 2
    d.rounded_rectangle([x, y, x+w, y+h], radius=r, fill=bg)
    d.text((x + w//2, y + h//2), text, font=font(F_HEAVY, 18), fill=fc, anchor="mm")

pill(draw, W-200, 50, 140, 38, "v0.1.0", (0, 0, 0), CYAN)


# ---------- 3. Main wordmark ----------
title = "AEGIS"
tfont = font(F_HEAVY, 170)
glow2 = Image.new("RGBA", (W, H), (0, 0, 0, 0))
gd = ImageDraw.Draw(glow2)
gd.text((58, 180), title, font=tfont, fill=(0, 212, 255, 100))
glow2 = glow2.filter(ImageFilter.GaussianBlur(24))
img = Image.alpha_composite(img, glow2)
draw = ImageDraw.Draw(img, "RGBA")
draw.text((60, 180), title, font=tfont, fill=WHITE)


# ---------- 4. Tagline + stats ----------
draw.text((68, 380), "reputation that travels with your agent", font=font(F_REG, 26), fill=GRAY)
stats = "1,284 agents    ·    42,109 receipts    ·    87.3% pass rate"
draw.text((68, 425), stats, font=font(F_MONO, 18), fill=CYAN)


# ---------- 5. Right side: 3 floating receipt cards ----------
def card_render(d, x, y, w, h, id_, actor, action, verdict, verdict_color):
    # shadow
    sh = Image.new("RGBA", (w+20, h+20), (0, 0, 0, 0))
    sd = ImageDraw.Draw(sh)
    sd.rounded_rectangle([10, 10, w+10, h+10], radius=12, fill=(0, 0, 0, 180))
    sh = sh.filter(ImageFilter.GaussianBlur(12))
    img.alpha_composite(sh, (x-10, y-10))
    # body
    d.rounded_rectangle([x, y, x+w, y+h], radius=12, fill=(14, 14, 18), outline=CYAN, width=1)
    # header
    d.text((x+14, y+12), id_, font=font(F_MONO, 12), fill=DIM)
    # actor
    d.text((x+14, y+30), actor, font=font(F_HEAVY, 16), fill=WHITE)
    # action
    d.text((x+14, y+52), action, font=font(F_MONO, 11), fill=GRAY)
    # verdict pill
    vw, vh = 64, 26
    vx, vy = x + w - vw - 12, y + h - vh - 12
    d.rounded_rectangle([vx, vy, vx+vw, vy+vh], radius=6, fill=verdict_color)
    d.text((vx+vw//2, vy+vh//2), verdict, font=font(F_HEAVY, 14), fill=(5, 5, 8), anchor="mm")

def rotated_card(x, y, w, h, id_, actor, action, verdict, vcolor, angle):
    tmp = Image.new("RGBA", (w+40, h+40), (0, 0, 0, 0))
    td = ImageDraw.Draw(tmp)
    card_render(td, 20, 20, w, h, id_, actor, action, verdict, vcolor)
    rot = tmp.rotate(angle, resample=Image.BICUBIC, expand=True)
    img.alpha_composite(rot, (x - 20, y - 20))

cw, ch = 240, 105
rotated_card(1020,  50,  cw, ch, "req_0001", "codex-shell",   "shell.run npm test",     "PASS",  GREEN,  -3)
rotated_card(1230, 165, cw, ch, "req_0004", "vault-finance", "tx.send 0.5 ETH",        "PAUSE", AMBER,   2)
rotated_card(1010, 285, cw, ch, "req_0008", "pulse-marketing", "fs.read .env",         "DENY",  RED,   -2)


# ---------- 6. Decorative crosshair ----------
def crosshair(d, cx, cy, size, color):
    d.line([(cx-size, cy), (cx+size, cy)], fill=color, width=2)
    d.line([(cx, cy-size), (cx, cy+size)], fill=color, width=2)
    d.ellipse([cx-size//2, cy-size//2, cx+size//2, cy+size//2], outline=color, width=2)
    d.ellipse([cx-3, cy-3, cx+3, cy+3], fill=color)

crosshair(draw, 1430, 100, 26, (0, 212, 255, 120))
crosshair(draw, 980,  445, 18, (0, 212, 255,  90))


# ---------- 7. Footer ----------
foot = "Base  ·  app.virtuals.io  ·  pre-launch"
draw.text((W-65, 460), foot, font=font(F_MONO, 16), fill=GRAY, anchor="rm")
draw.text((60, 460), "REPUTATION LAYER", font=font(F_HEAVY, 14), fill=CYAN_HI)


# ---------- 8. Top/bottom accent lines ----------
draw.line([(0, 30), (W, 30)], fill=(0, 212, 255, 60), width=1)
draw.line([(0, H-30), (W, H-30)], fill=(0, 212, 255, 60), width=1)


# ---------- 9. Save ----------
out = "/Users/muhammadnuran/aegis/public/banner.png"
img.convert("RGB").save(out, "PNG", optimize=True)
print("OK:", out, os.path.getsize(out), "bytes")
