"""Generate favicons and 1200×630 Open Graph images into public/.

Run from the repository root after changing app names, taglines or icons:
    python3 scripts/make-images.py
Needs Pillow and the Inter font (https://rsms.me/inter/) installed; set INTER_DIR if it
isn't in /usr/share/fonts/opentype/inter.
"""
import os
from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = Path(__file__).resolve().parent.parent
PUB = ROOT / "public"
ASSETS = ROOT / "src" / "assets" / "apps"
INTER = Path(os.environ.get("INTER_DIR", "/usr/share/fonts/opentype/inter"))

BG = (9, 9, 11)
TEXT = (241, 241, 243)
TEXT2 = (169, 172, 181)
CORAL = (229, 72, 77)
W, H = 1200, 630


def font(name, size):
    return ImageFont.truetype(str(INTER / name), size)


def rounded(img, radius):
    mask = Image.new("L", img.size, 0)
    ImageDraw.Draw(mask).rounded_rectangle([0, 0, img.size[0] - 1, img.size[1] - 1], radius, fill=255)
    out = img.convert("RGBA")
    out.putalpha(mask)
    return out


def canvas(accent):
    img = Image.new("RGBA", (W, H), BG + (255,))
    glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    ImageDraw.Draw(glow).ellipse([700, -260, 1500, 540], fill=accent + (70,))
    img.alpha_composite(glow.filter(ImageFilter.GaussianBlur(140)))
    grid = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    g = ImageDraw.Draw(grid)
    for x in range(0, W, 60):
        g.line([(x, 0), (x, H)], fill=(255, 255, 255, 9))
    for y in range(0, H, 60):
        g.line([(0, y), (W, y)], fill=(255, 255, 255, 9))
    img.alpha_composite(grid)
    return img


def mark(size):
    """The site mark: open C ring with a coral record dot (matches src/components/Logo.astro)."""
    s = 8
    big = Image.new("RGBA", (32 * s, 32 * s), (0, 0, 0, 0))
    d = ImageDraw.Draw(big)
    d.rounded_rectangle([0, 0, 32 * s - 1, 32 * s - 1], 9 * s, fill=TEXT)
    r = 7.2 * s
    cx, cy = 16 * s, 16 * s
    d.arc([cx - r, cy - r, cx + r, cy + r], 48, 312, fill=BG, width=int(3.2 * s))
    d.ellipse([22.6 * s - 2.4 * s, cy - 2.4 * s, 22.6 * s + 2.4 * s, cy + 2.4 * s], fill=CORAL)
    return big.resize((size, size), Image.LANCZOS)


def footer(img, d):
    img.alpha_composite(mark(34), (72, H - 34 - 56))
    d.text((118, H - 56 - 17), "chrisgonzalez.net", font=font("Inter-SemiBold.otf", 24), fill=TEXT2, anchor="lm")


def wrap(d, text, f, width):
    words, lines, line = text.split(), [], ""
    for w in words:
        t = (line + " " + w).strip()
        if d.textlength(t, font=f) <= width:
            line = t
        else:
            lines.append(line)
            line = w
    lines.append(line)
    return lines


def product(slug, name, tagline, icon_path, accent, shot_path, shot_kind):
    img = canvas(accent)
    d = ImageDraw.Draw(img)
    icon = rounded(Image.open(icon_path).convert("RGBA").resize((112, 112), Image.LANCZOS), 25)
    img.alpha_composite(icon, (72, 72))
    d.text((72, 228), name, font=font("InterDisplay-Bold.otf", 72 if len(name) < 14 else 60), fill=TEXT)
    y = 322
    for line in wrap(d, tagline, font("Inter-Medium.otf", 34), 560):
        d.text((72, y), line, font=font("Inter-Medium.otf", 34), fill=TEXT2)
        y += 46
    footer(img, d)

    shot = Image.open(shot_path).convert("RGB")
    if shot_kind == "phone":
        w = 330
        shot = shot.resize((w, int(shot.size[1] * w / shot.size[0])), Image.LANCZOS)
        frame = Image.new("RGBA", (w + 24, shot.size[1] + 24), (29, 31, 36, 255))
        frame = rounded(frame, 58)
        frame.alpha_composite(rounded(shot, 46), (12, 12))
        img.alpha_composite(frame, (W - w - 120, 70))
    else:
        w = 560
        shot = shot.resize((w, int(shot.size[1] * w / shot.size[0])), Image.LANCZOS)
        img.alpha_composite(rounded(shot, 18), (W - w + 110, 190))
    img.convert("RGB").save(PUB / "og" / f"{slug}.png", optimize=True)


def default_og():
    img = canvas(CORAL)
    d = ImageDraw.Draw(img)
    img.alpha_composite(mark(96), (72, 80))
    d.text((72, 230), "Chris Gonzalez", font=font("InterDisplay-Bold.otf", 84), fill=TEXT)
    d.text((72, 336), "Thoughtful software, built independently.", font=font("Inter-Medium.otf", 36), fill=TEXT2)
    x = 72
    icons = [
        Image.open(PUB / "press" / "on-record" / "on-record-icon-1024.png"),
        Image.open(PUB / "icons" / "pilot-buddy.png"),
        Image.open(PUB / "icons" / "atlsim-copilot.png"),
    ]
    for ic in icons:
        img.alpha_composite(rounded(ic.convert("RGBA").resize((76, 76), Image.LANCZOS), 17), (x, 420))
        x += 96
    d.text((W - 72, H - 73), "chrisgonzalez.net", font=font("Inter-SemiBold.otf", 24), fill=TEXT2, anchor="rm")
    img.convert("RGB").save(PUB / "og" / "default.png", optimize=True)


def favicons():
    m = mark(512)
    m.resize((180, 180), Image.LANCZOS).save(PUB / "apple-touch-icon.png")
    m.resize((512, 512)).save(PUB / "icon-512.png")
    m.save(PUB / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])


if __name__ == "__main__":
    (PUB / "og").mkdir(exist_ok=True)
    or_icon = PUB / "press" / "on-record" / "on-record-icon-1024.png"
    product("on-record", "On Record", "Private meeting notes, made on your Mac.", or_icon, CORAL,
            ASSETS / "on-record" / "iphone-summary.png", "phone")
    product("pilot-buddy", "Pilot Buddy", "Flight planning, simplified.", PUB / "icons" / "pilot-buddy.png", (91, 123, 224),
            ASSETS / "pilot-buddy" / "home-dark.png", "phone")
    product("atlsim-copilot", "ATLsim – CoPilot", "Voice-controlled checklists for your flight simulator.",
            PUB / "icons" / "atlsim-copilot.png", (45, 140, 255), ASSETS / "atlsim-copilot" / "run-checklist.png", "window")
    default_og()
    favicons()
    print("done")
