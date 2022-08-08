const startTime = Date.now();
const timer = setInterval(updateClock, 100);
let openCard = null;
let clicks = 0;

function clicked(e) {
  const oldTitle = Number(e.title);
  const counter = document.getElementById('clicks');

  flipCard(e);
  e.title = (oldTitle + 1).toString();
  if (
    document.getElementsByClassName('success').length ===
    document.getElementsByClassName('cell').length
  ) {
    return;
  }

  clicks += 1;
  counter.innerHTML = clicks.toString();
}

function flipCard(cell) {
  if (
    cell.classList.contains('success') ||
    !cell.classList.contains('hide')
  ) {
    return;
  }

  if (cell.classList.contains('hide')) {
    cell.classList.remove('hide');
    setTimeout(() => checkMatch(cell), 1000);
  } else {
    cell.classList.add('hide');
  }
}

function checkMatch(cell) {
  if (openCard === cell) {
    return;
  }

  if (openCard === null) {
    openCard = cell;
    return;
  }

  if (openCard.innerHTML === cell.innerHTML) {
    cell.classList.add('success');
    openCard.classList.add('success');
    if (
      document.getElementsByClassName('cell').length ===
      document.getElementsByClassName('success').length
    ) {
      clearInterval(timer);
    }
  }

  cell.classList.add('hide');
  openCard.classList.add('hide');
  openCard = null;
}

function updateClock() {
  const now = Date.now() - startTime;
  const clock = document.getElementById('time');
  const hr = Math.trunc(now / 3600000);
  let min = Math.trunc(now / 60000 % 60);
  let sec = Math.trunc(now / 1000 % 60);

  if (sec < 10) {
    sec = `0${sec.toString()}`;
  }


  if (hr > 0 && min < 10) {
    min = `0${min.toString()}`;
  }

  let time = `${min}:${sec}`;

  if (hr > 0) {
    time = `${hr}:${time}`;
  }

  clock.innerHTML = time;
}

function params() {
  var p = {};
  var parts = window.location.href
    .replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,k,v) {
      p[k] = v;
    });
  return p;
}

// From https://stackoverflow.com/a/47593316/3438854
function cyrb128(str) {
  let h1 = 1779033703,
      h2 = 3144134277,
      h3 = 1013904242,
      h4 = 2773480762;

  for (let i = 0, k; i < str.length; i++) {
    k = str.charCodeAt(i);
    h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
    h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
    h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
    h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
  }

  h1 = Math.imul(h3 ^ (h1 >>> 18), 597399067);
  h2 = Math.imul(h4 ^ (h2 >>> 22), 2869860233);
  h3 = Math.imul(h1 ^ (h3 >>> 17), 951274213);
  h4 = Math.imul(h2 ^ (h4 >>> 19), 2716044179);

  return [(h1^h2^h3^h4)>>>0, (h2^h1)>>>0, (h3^h1)>>>0, (h4^h1)>>>0];
}

function sfc32(a, b, c, d) {
  return function() {
    a >>>= 0;
    b >>>= 0;
    c >>>= 0;
    d >>>= 0;
    var t = (a + b) | 0;
    a = b ^ b >>> 9;
    b = c + (c << 3) | 0;
    c = (c << 21 | c >>> 11);
    d = d + 1 | 0;
    t = t + d | 0;
    c = c + t | 0;
    return (t >>> 0) / 4294967296;
  }
}
