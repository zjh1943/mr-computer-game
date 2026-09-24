"""Import the non-horror Colorful Bunch Erect song, unchanged chart and mixed local audio."""
import json
import math
import pathlib
import zipfile

ROOT = pathlib.Path(__file__).resolve().parents[1]
ARCHIVE = ROOT / "outputs" / "sprunki-reference.zip"
DATA_FILE = ROOT / "dance-reference-data.js"
BASE = "(V2.1.0) Yet Another Sprunki FNF Mod/mods/Sprunki/"
SLUG = "colorful-bunch-erect"
TRACK_ID = "reference-colorful-bunch-erect"

text = DATA_FILE.read_text(encoding="utf8")
start = text.index("const data=") + len("const data=")
end = text.index(";if(typeof module", start)
manifest = json.loads(text[start:end])

with zipfile.ZipFile(ARCHIVE) as archive:
    chart = json.loads(archive.read(BASE + f"data/{SLUG}/{SLUG}-erect.json"))

    def character(value):
        value = (value or "").replace("-erect", "")
        return {"polo": None, "polo2": None}.get(value, value)

    notes = []
    for section in chart["notes"]:
        for raw in section["sectionNotes"]:
            if raw[1] < 0:
                continue
            player = bool(section["mustHitSection"]) ^ (int(raw[1]) >= 4)
            note_type = raw[3] if len(raw) > 3 else ""
            side = "gf" if note_type == "GF Sing" else ("player" if player else "dad")
            notes.append({
                "time": round(raw[0] / 1000, 5), "lane": int(raw[1]) % 4,
                "side": side, "hit": player, "hold": round(raw[2] / 1000, 5),
                "animate": note_type != "No Animation"
            })
    notes.sort(key=lambda note: note["time"])

    events = []
    for milliseconds, event_group in chart.get("events", []):
        for event in event_group:
            if event[0] != "Change Character":
                continue
            changed = character(event[2])
            if changed not in manifest["characters"]:
                continue
            side = {"bf": "player", "0": "player", "1": "dad", "2": "gf"}.get(event[1], event[1])
            events.append({"time": milliseconds / 1000, "side": side, "character": changed})

    audio_stems = []
    for stem_name in ("Inst", "Voices-Opponent", "Voices-Player"):
        output_name = f"{SLUG}-{stem_name.lower()}.ogg"
        (ROOT / "assets" / "dance-reference" / output_name).write_bytes(archive.read(BASE + f"songs/{SLUG}/{stem_name}.ogg"))
        audio_stems.append(f"./assets/dance-reference/{output_name}")

track = {
    "id": TRACK_ID, "name": chart["song"], "artist": "Just_Camilo",
    "bpm": chart["bpm"], "duration": math.ceil(notes[-1]["time"] + 4),
    "reference": True, "audioStems": audio_stems,
    "cast": [character(chart["player2"]), character(chart.get("gfVersion"))],
    "lead": character(chart["player1"]),
    "initial": {"player": character(chart["player1"]), "dad": character(chart["player2"]), "gf": character(chart.get("gfVersion"))},
    "notes": notes, "events": sorted(events, key=lambda event: event["time"]),
    "source": "https://gamebanana.com/mods/585623"
}
manifest["tracks"] = [existing for existing in manifest["tracks"] if existing["id"] != TRACK_ID] + [track]
DATA_FILE.write_text("/* Normal-mode source: Just_Camilo, Yet Another Sprunki FNF Mod. See assets/dance-reference/README.md. */\n(()=>{const data=" + json.dumps(manifest, separators=(",", ":")) + ";if(typeof module!==\"undefined\")module.exports=data;else window.DanceReferenceData=data;})();\n", encoding="utf8")
