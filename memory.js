const startTime = Date.now();
const timer = setInterval(updateClock, 100);
let openCard = null;
let clicks = 0;

function clicked(e) {
  const oldTitle = Number(e.title);
  const counter = document.getElementById('clicks');

  flipCard(e);
  e.title = (oldTitle + 1).toString();
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
