```js
const size = 4; // 4x4 grid
const container = document.getElementById('puzzle-container');
let pieces = [];
let emptyIndex = size * size - 1; // terakhir kosong

function createPuzzle() {
  container.innerHTML = '';
  pieces = [];

  for (let i = 0; i < size * size; i++) {
    const piece = document.createElement('div');
    piece.classList.add('puzzle-piece');
    if (i === emptyIndex) {
      piece.classList.add('empty');
    } else {
      piece.style.backgroundPosition = 
        `-(i{-Math.floor(i / size) * (320 / size)}px`;
    }
    piece.addEventListener('click', () => movePiece(i));
    pieces.push(piece);
    container.appendChild(piece);
  }
}

function movePiece(index) {
  if (canMove(index)) {
    pieces[emptyIndex].classList.remove('empty');
    pieces[emptyIndex].style.backgroundPosition = pieces[index].style.backgroundPosition;

    pieces[index].classList.add('empty');
    pieces[index].style.backgroundPosition = '';

    emptyIndex = index;
    checkWin();
  }
}

function canMove(index) {
  const rowEmpty = Math.floor(emptyIndex / size);
  const colEmpty = emptyIndex % size;
  const rowIndex = Math.floor(index / size);
  const colIndex = index % size;

  return (
    (rowEmpty === rowIndex && Math.abs(colEmpty - colIndex) === 1) ||