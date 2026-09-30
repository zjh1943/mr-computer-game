from pathlib import Path
from collections import deque
from PIL import Image

root = Path('assets/dance-reference')
source = Image.open(root / 'role-icons.png').convert('RGBA')
out = root / 'role-icons'
out.mkdir(exist_ok=True)
ids = ['oren','raddy','clukr','funbot','vineria','gray','brud','garnold','lime','sky','mr_sun','durple','mr_tree','simon','tunner','computer','wenda','pinki','jevin','black']
for index, role in enumerate(ids):
    row, col = divmod(index, 10)
    x = (8 if row == 0 else 38) + col * 60
    y = row * 65
    icon = source.crop((x, y, x + 54, min(source.height, y + 64)))
    pix = icon.load(); w,h = icon.size
    queue = deque()
    seen = set()
    for px in range(w): queue.extend(((px,0),(px,h-1)))
    for py in range(h): queue.extend(((0,py),(w-1,py)))
    while queue:
        px,py=queue.popleft()
        if (px,py) in seen or not (0<=px<w and 0<=py<h): continue
        seen.add((px,py)); r,g,b,a=pix[px,py]
        if max(r,g,b)>42 or max(r,g,b)-min(r,g,b)>15: continue
        pix[px,py]=(r,g,b,0)
        queue.extend(((px-1,py),(px+1,py),(px,py-1),(px,py+1)))
    icon.save(out / f'{role}.png', optimize=True)

# Keep the supplied little gray person while removing its cyan/green screenshot background.
gray = Image.open(root / 'gray-person.png').convert('RGBA')
pix=gray.load()
for y in range(gray.height):
    for x in range(gray.width):
        r,g,b,a=pix[x,y]
        saturation=max(r,g,b)-min(r,g,b)
        if saturation > 35 and (g > 75 or b > 75): pix[x,y]=(0,0,0,0)
box=gray.getbbox()
if box: gray=gray.crop(box)
gray.save(root/'gray-person-cutout.png', optimize=True)

