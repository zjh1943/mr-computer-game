"""Crop the exact normal FNF arrow frames from the allowlisted reference archive."""
import io
import pathlib
import zipfile
import xml.etree.ElementTree as ET
from PIL import Image

ROOT = pathlib.Path(__file__).resolve().parents[1]
ARCHIVE = ROOT / "outputs" / "sprunki-reference.zip"
BASE = "(V2.1.0) Yet Another Sprunki FNF Mod/assets/shared/images/noteSkins/"
OUT = ROOT / "assets" / "dance-reference" / "arrows"
OUT.mkdir(parents=True, exist_ok=True)

FRAME_NAMES = {
    "arrowLEFT0000": "receptor-left.png",
    "arrowDOWN0000": "receptor-down.png",
    "arrowUP0000": "receptor-up.png",
    "arrowRIGHT0000": "receptor-right.png",
    "purple0000": "note-left.png",
    "blue0000": "note-down.png",
    "green0000": "note-up.png",
    "red0000": "note-right.png",
}

with zipfile.ZipFile(ARCHIVE) as archive:
    sheet = Image.open(io.BytesIO(archive.read(BASE + "NOTE_assets.png"))).convert("RGBA")
    atlas = ET.fromstring(archive.read(BASE + "NOTE_assets.xml"))
    frames = {node.attrib["name"]: node.attrib for node in atlas}
    for source_name, output_name in FRAME_NAMES.items():
        frame = frames[source_name]
        x, y, width, height = (int(frame[key]) for key in ("x", "y", "width", "height"))
        sheet.crop((x, y, x + width, y + height)).save(OUT / output_name, optimize=True)

