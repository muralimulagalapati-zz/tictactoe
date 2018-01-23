
document.addEventListener('DOMContentLoaded', init);
var size = 3, score, moves, turn;

function init() {
  var boxes = document.querySelectorAll(".box");
  boxes.forEach(function (box) {
    box.textContent = '';
    box.addEventListener('click', setValue);
  });
  document.querySelector('#pause').addEventListener('click', handlePause);
  startNewGame();
}

function startNewGame() {
  moves = 0;
  turn = "X";
}

function setValue(el) {
  if (el.target.textContent !== '') {
    return;
  }
  el.target.textContent = turn;
  moves ++;
  if (determineWinner()) {
    alert('Winner: Player ' + turn);
    init();
  } else if (moves === size * size) {
    alert("Game Draws");
    init();
  } else {
    turn = turn === "X" ? "O" : "X";
  }
}

function determineWinner() {
  if (moves < 5) {
    return false;
  }
  return (rowCrossed() || colCrossed() || diagonalCrossed())
}

function getText(id) {
  return document.getElementById(id).textContent;
}

function rowCrossed() {
  for (var i = 0; i < size; i++) {
    if (getText(`${i}0`) !== '' &&
        getText(`${i}0`) === getText(`${i}1`) &&
        getText(`${i}1`) === getText(`${i}2`)
      ) return true;
  }
  return false;
}

function colCrossed() {
  for (var i = 0; i < size; i++) {
    if (getText(`0${i}`) !== '' &&
        getText(`0${i}`) === getText(`1${i}`) &&
        getText(`1${i}`) === getText(`2${i}`)
      ) return true;
  }
  return false;
}

function diagonalCrossed() {
  if (getText('00') !== '' &&
      getText('00') === getText('11') &&
      getText('11') === getText('22')
    ) return true;
  
  if (getText('20') !== '' &&
      getText('20') === getText('11') &&
      getText('11') === getText('02')
    ) return true;
  return false;
}

function handlePause(el) {
  var text = el.target.textContent;
  if (text === '|| Pause') {
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(getCurrentState()),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => {
      el.target.textContent = '> Resume';
      console.log('Success:', response);
    });
  } else {
    fetch(url)
    .then(res => res.json())
    .then(response => {
      console.log(response);
      el.target.textContent = '|| Pause';
    })
  }
  el.target.textContent = text === '> Resume' ? '|| Pause' : '> Resume';
}
