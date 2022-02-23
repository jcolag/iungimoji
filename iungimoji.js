const fs = require('fs');

let items = [];
let size = 4;

if (!isNaN(process.argv[2])) {
  size = Number(process.argv[2]);
}

const emoji = JSON.parse(fs.readFileSync('emoji.json'));
const squares = size * size;
const head = '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8">' +
  '<link rel="stylesheet" href="style.css"><script src="memory.js">' +
  '</script><title>Iungimoji!</title></head><body>' +
  '<h1>Iungimoji!</h1><div class="game" ';
const foot = '</div><div class="score"><div class="counter">Clicks: ' +
  '<span id="clicks">0</span></div><div class="counter">Time: ' +
  '<span id="time"></span></div></body>';

for (let em = 0; em < squares / 2; em++) {
  const index = Math.floor(Math.random() * emoji.length);
  const codepoints = emoji[index]
    .unified
    .split('-')
    .map((cp) => parseInt(cp, 16));
  let char = '';

  for (let i = 0; i < codepoints.length; i++) {
    char += String.fromCodePoint(codepoints[i]);
  }

  items.push(char);
  emoji.splice(index, 1);
}

const all = [...items, ...items];
const cells = [];

for (let i = 0; i < all.length; i++) {
  const temp = all[i];
  const j = Math.floor(Math.random() * all.length);

  all[i] = all[j];
  all[j] = temp;
}

for (let i = 0; i < all.length; i++) {
    cells.push('<div class="cell hide" onclick="clicked(this)"' +
      `id="c-${i}" title="0">${all[i]}</div>`);
    if (i % size === size - 1) {
      cells.push('<div class="break"></div>');
    }
}

fs.writeFileSync(
  'game.html',
  head + `style="width: ${13*size}vw">` + cells.join('\n') + foot
);

