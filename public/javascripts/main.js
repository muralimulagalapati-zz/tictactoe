
document.addEventListener('DOMContentLoaded', init);
var size = 3, score, moves, turn;
var url = 'api/state';

function init() {
  if (document.querySelector('#pause').textContent === 'Pause') {
    document.querySelectorAll(".box").forEach(function (box) {
      box.textContent = '';
    });
    document.querySelector('.wrapper').addEventListener('click', setValue);
    startNewGame();
  }
  document.querySelector('.btn').addEventListener('click', handlePause);
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

function getCurrentState(text) {
  var state = {
    status: text,
    moves: moves,
    turn: turn,
    boxes: []
  };

  document.querySelectorAll('.box').forEach(function(box) {
    state.boxes.push({id: box.id, value: box.textContent});
  })

  return state;
}

function resetState(state, text) {
  if (text === 'Resume') {
    moves = state.moves;
    turn = state.turn;
  }
}

function handlePause(el) {
  var text = el.target.textContent;
  if (text === 'Pause') {
    document.querySelector('.wrapper').removeEventListener('click', setValue);
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(getCurrentState(text)),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
    .then(res => res)
    .catch(error => console.error('Error:', error))
    .then(response => {
      el.target.textContent = 'Resume';
    });
  } else {
    fetch(url)
    .then(res => res.json())
    .then(response => {
      resetState(response, text);
      el.target.textContent = 'Pause';
      document.querySelector('.wrapper').addEventListener('click', setValue);
    })
  }
}
