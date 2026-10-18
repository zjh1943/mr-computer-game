import json
import os
import subprocess
import sys

from reportlab.lib.colors import Color, HexColor
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "output", "pdf", "colorful-bunch-simon-violin-score.pdf")
NODE = r"C:\Users\admin\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe"

NAMES = {
    "oren": "奥伦", "raddy": "瑞迪", "clukr": "克拉克", "vineria": "维内里亚",
    "funbot": "快乐机器人", "gray": "小灰人", "brud": "布鲁德", "lime": "莱姆",
    "garnold": "加诺德", "sky": "天空", "mr_sun": "太阳公公", "durple": "德普勒",
    "mr_tree": "大树先生", "tunner": "图纳", "computer": "电脑先生", "wenda": "温达",
    "pinki": "平吉", "jevin": "杰文",
}

def source_track():
    command = "const d=require('./dance-reference-data.js');const t=d.tracks.find(x=>x.id==='reference-colorful-bunch');process.stdout.write(JSON.stringify(t));"
    raw = subprocess.check_output([NODE, "-e", command], cwd=ROOT, text=True, encoding="utf-8")
    return json.loads(raw)

def active_character(track, side, time):
    events = [event for event in track["events"] if event.get("side") == side and event.get("time", 0) <= time and event.get("character")]
    character = events[-1]["character"] if events else track["initial"].get(side)
    return NAMES.get(character, character or "")

def avoid_barline(x, start_x, bar_width, bars):
    for bar in range(bars + 1):
        line = start_x + bar * bar_width
        if abs(x - line) < 2.4 * mm:
            return x - 2.8 * mm if x <= line else x + 2.8 * mm
    return x

def text(c, value, x, y, size, color=HexColor("#211a14")):
    c.setFont("SimHei", size)
    c.setFillColor(color)
    c.drawString(x, y, value)

# This score is intended for ordinary home printing, so each page is A4 portrait.
# Ten short systems fit on each page, producing a four-page score for this chart.
PAGE = A4

def draw_treble_clef(c, x, staff_top, staff_bottom):
    """Draw the Unicode musical-symbol treble clef from Segoe UI Symbol."""
    c.setFont("MusicSymbol", 38)
    c.setFillColor(HexColor("#211a14"))
    c.drawCentredString(x + 3 * mm, staff_bottom - 4.5 * mm, "𝄞")

def draw_header(c, page, paint_background=True):
    width, height = PAGE
    if paint_background:
        c.setFillColor(HexColor("#fffaf1"))
        c.rect(0, 0, width, height, fill=1, stroke=0)
    text(c, "Colorful Bunch · 西蒙小提琴谱", 22 * mm, height - 20 * mm, 20, HexColor("#211a14"))
    text(c, "高音谱号 = 小提琴谱表  |  黑色音符 = 西蒙旋律  |  音符上小点 = 点音  |  弧线 = 长音拉弓  |  竖线 = 小节线", 18 * mm, height - 29 * mm, 7.2, HexColor("#665a4d"))
    c.setStrokeColor(HexColor("#d5b77c"))
    c.line(18 * mm, height - 33 * mm, width - 18 * mm, height - 33 * mm)
    text(c, f"第 {page} 页 / 4 · 完整原曲 4 分 22 秒 · 133 BPM · A4 竖向打印", 18 * mm, 9 * mm, 7, HexColor("#665a4d"))

def draw_system(c, track, start, end, y):
    width, _ = PAGE
    left, right = 27 * mm, width - 18 * mm
    staff_top = y - 2 * mm
    staff_gap = 2.8 * mm
    staff_bottom = staff_top - staff_gap * 4
    bars = 2
    bar_width = (right - left) / bars
    notes = [note for note in track["notes"] if start <= note["time"] < end and note.get("animate", True)]
    simon = [note for note in notes if note["side"] == "player" and note.get("hit") is True]
    # The original FNF chart can place many simultaneous lane taps in a few tenths
    # of a second. Reduce each short system to a legible violin practice line rather
    # than stacking unreadable noteheads on top of one another on A4 paper.
    if len(simon) > 14:
        step = (len(simon) - 1) / 13
        simon = [simon[round(index * step)] for index in range(14)]
    others = []
    for note in notes:
        if note["side"] != "player":
            name = active_character(track, note["side"], note["time"])
            if name and name not in others:
                others.append(name)
    label = f"{int(start//60)}:{int(start%60):02d} - {int(end//60)}:{int(end%60):02d}  西蒙"
    text(c, label, left, y + 3 * mm, 6.5, HexColor("#211a14"))
    if others:
        text(c, "其他角色：" + "、".join(others), left + 48 * mm, y + 3 * mm, 6, HexColor("#665a4d"))
    c.setStrokeColor(HexColor("#211a14"))
    c.setLineWidth(0.5)
    for index in range(5):
        line_y = staff_top - index * staff_gap
        c.line(left, line_y, right, line_y)
    draw_treble_clef(c, left - 11 * mm, staff_top, staff_bottom)
    for bar in range(bars + 1):
        x = left + bar * bar_width
        c.line(x, staff_top, x, staff_bottom)
    lane_y = [staff_bottom, staff_bottom + staff_gap, staff_bottom + staff_gap * 2, staff_bottom + staff_gap * 3]
    for note_index, note in enumerate(simon):
        x = avoid_barline(left + (note["time"] - start) / (end - start) * (right - left), left, bar_width, bars)
        note_y = lane_y[abs(note["lane"]) % 4]
        hold = float(note.get("hold", 0))
        next_time = simon[note_index + 1]["time"] if note_index + 1 < len(simon) else end
        gap = next_time - note["time"]
        if hold > 0:
            end_x = min(right - 1 * mm, x + hold / (end - start) * (right - left))
            c.setStrokeColor(HexColor("#211a14"))
            c.setLineWidth(0.85)
            tie = c.beginPath()
            tie.moveTo(x + 2 * mm, note_y + 1.8 * mm)
            tie.curveTo(x + (end_x - x) * .35, note_y + 5 * mm, x + (end_x - x) * .7, note_y + 5 * mm, end_x, note_y + 1.8 * mm)
            c.drawPath(tie, fill=0, stroke=1)
            c.setLineWidth(0.5)
        c.setFillColor(HexColor("#211a14"))
        c.ellipse(x - 1.8 * mm, note_y - 1.25 * mm, x + 1.8 * mm, note_y + 1.25 * mm, fill=1, stroke=1)
        c.setStrokeColor(HexColor("#211a14"))
        c.line(x + 1.4 * mm, note_y, x + 1.4 * mm, note_y + 8.5 * mm)
        if hold == 0:
            c.setFillColor(HexColor("#211a14"))
            c.circle(x, note_y + 3.3 * mm, 0.6 * mm, fill=1, stroke=0)
            if gap <= 0.14:
                c.setLineWidth(0.65)
                c.line(x + 1.4 * mm, note_y + 8.5 * mm, x + 4.3 * mm, note_y + 6.4 * mm)
                c.line(x + 1.4 * mm, note_y + 6.4 * mm, x + 4.0 * mm, note_y + 4.3 * mm)
            elif gap <= 0.27:
                c.setLineWidth(0.65)
                c.line(x + 1.4 * mm, note_y + 8.5 * mm, x + 4.3 * mm, note_y + 6.4 * mm)
    return y - 22 * mm

def main():
    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    pdfmetrics.registerFont(TTFont("SimHei", r"C:\Windows\Fonts\simhei.ttf"))
    pdfmetrics.registerFont(TTFont("MusicSymbol", r"C:\Windows\Fonts\seguisym.ttf"))
    track = source_track()
    c = canvas.Canvas(OUT, pagesize=PAGE, pageCompression=1)
    duration, bpm = track["duration"], track["bpm"]
    bar_seconds = 60 / bpm * 4
    system_seconds = bar_seconds * 4
    starts = list(range(0, int(duration / system_seconds) + 1))
    page, on_page, y = 1, 0, PAGE[1] - 41 * mm
    draw_header(c, page)
    rows_per_page = [10, 9, 9, 9]
    for index, unit in enumerate(starts):
        start = unit * system_seconds
        if start >= duration:
            break
        if on_page == rows_per_page[page - 1]:
            draw_header(c, page, paint_background=False)
            c.showPage()
            c.setPageSize(PAGE)
            page += 1
            on_page = 0
            y = PAGE[1] - 41 * mm
            draw_header(c, page)
        y = draw_system(c, track, start, min(duration, start + system_seconds), y)
        on_page += 1
    draw_header(c, page, paint_background=False)
    c.save()
    print(OUT)

if __name__ == "__main__":
    main()
