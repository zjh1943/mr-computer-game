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

def draw_header(c, page):
    width, height = A4
    c.setFillColor(HexColor("#fffaf1"))
    c.rect(0, 0, width, height, fill=1, stroke=0)
    text(c, "Colorful Bunch · 西蒙小提琴谱", 18 * mm, height - 20 * mm, 18, HexColor("#2b416f"))
    text(c, "仅记录西蒙按箭头、发出西蒙音色的旋律；其他角色只写名字提示。", 18 * mm, height - 28 * mm, 8, HexColor("#665a4d"))
    c.setStrokeColor(HexColor("#d5b77c"))
    c.line(18 * mm, height - 32 * mm, width - 18 * mm, height - 32 * mm)
    text(c, f"第 {page} 页 · 完整原曲 4 分 22 秒 · 133 BPM", 18 * mm, 11 * mm, 7, HexColor("#665a4d"))

def draw_system(c, track, start, end, y):
    width, _ = A4
    left, right = 25 * mm, width - 18 * mm
    staff_top = y - 2 * mm
    staff_gap = 3.4 * mm
    staff_bottom = staff_top - staff_gap * 4
    bars = 2
    bar_width = (right - left) / bars
    notes = [note for note in track["notes"] if start <= note["time"] < end and note.get("animate", True)]
    simon = [note for note in notes if note["side"] == "player" and note.get("hit") is True]
    others = []
    for note in notes:
        if note["side"] != "player":
            name = active_character(track, note["side"], note["time"])
            if name and name not in others:
                others.append(name)
    label = f"{int(start//60)}:{int(start%60):02d} - {int(end//60)}:{int(end%60):02d}  西蒙"
    text(c, label, left, y + 4 * mm, 8, HexColor("#294f9f"))
    if others:
        text(c, "其他角色演唱：" + "、".join(others), left + 52 * mm, y + 4 * mm, 7, HexColor("#a4401d"))
    c.setStrokeColor(HexColor("#211a14"))
    c.setLineWidth(0.5)
    for index in range(5):
        line_y = staff_top - index * staff_gap
        c.line(left, line_y, right, line_y)
    c.setFont("Times-Bold", 25)
    c.setFillColor(HexColor("#315dbc"))
    c.drawString(left - 9 * mm, staff_bottom - 2 * mm, "G")
    for bar in range(bars + 1):
        x = left + bar * bar_width
        c.line(x, staff_top, x, staff_bottom)
    lane_y = [staff_bottom, staff_bottom + staff_gap, staff_bottom + staff_gap * 2, staff_bottom + staff_gap * 3]
    for note in simon:
        x = avoid_barline(left + (note["time"] - start) / (end - start) * (right - left), left, bar_width, bars)
        note_y = lane_y[abs(note["lane"]) % 4]
        hold = float(note.get("hold", 0))
        if hold > 0:
            end_x = min(right - 1 * mm, x + hold / (end - start) * (right - left))
            c.setStrokeColor(HexColor("#315dbc"))
            c.setLineWidth(1.8)
            c.line(x + 2.2 * mm, note_y, end_x, note_y)
            c.setLineWidth(0.5)
        c.setFillColor(HexColor("#315dbc"))
        c.ellipse(x - 1.8 * mm, note_y - 1.25 * mm, x + 1.8 * mm, note_y + 1.25 * mm, fill=1, stroke=1)
        c.setStrokeColor(HexColor("#211a14"))
        c.line(x + 1.4 * mm, note_y, x + 1.4 * mm, note_y + 8.5 * mm)
        if hold == 0:
            c.setFillColor(HexColor("#211a14"))
            c.circle(x, note_y + 3.3 * mm, 0.6 * mm, fill=1, stroke=0)
    return y - 34 * mm

def main():
    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    pdfmetrics.registerFont(TTFont("SimHei", r"C:\Windows\Fonts\simhei.ttf"))
    track = source_track()
    c = canvas.Canvas(OUT, pagesize=A4, pageCompression=1)
    duration, bpm = track["duration"], track["bpm"]
    bar_seconds = 60 / bpm * 4
    system_seconds = bar_seconds * 2
    starts = list(range(0, int(duration / system_seconds) + 1))
    page, on_page, y = 1, 0, A4[1] - 42 * mm
    draw_header(c, page)
    for index, unit in enumerate(starts):
        start = unit * system_seconds
        if start >= duration:
            break
        if on_page == 5:
            c.showPage(); page += 1; on_page = 0; y = A4[1] - 42 * mm; draw_header(c, page)
        y = draw_system(c, track, start, min(duration, start + system_seconds), y)
        on_page += 1
    c.save()
    print(OUT)

if __name__ == "__main__":
    main()
