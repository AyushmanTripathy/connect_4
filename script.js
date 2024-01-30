const n = 6;
const messageElement = document.getElementById("msg");
const container = document.querySelector(".container");
const map = Array(n)
  .fill(0)
  .map(() => Array(n).fill(0));
const heights = Array(n).fill(n - 1);

let player = 1, won = false;

function updateMsg(message) {
  messageElement.innerHTML = message;
}

function checkGrid(r, c) {
  const check = (x, y, dx, dy) => {
    let count = 0;
    while (x < n && x > -1 && y < n && y > -1) {
      if (map[x][y] == player) count++;
      else count = 0;
      if (count == 4) return true;
      x += dx
      y += dy
    }
    return false;
  }

  if (check(r, 0, 0, 1) || check(0, c, 1, 0)) return true;
  if (r <= c && check(0, c - r, 1, 1)) return true;
  else if (check(n - 1, c + (n - 1) - r, -1, -1)) return true;

  if (r + c <= n - 1 && check(0, r + c, 1, -1)) return true;
  else if (check(n - 1, c - (n - 1 - r), -1, 1)) return true;
  return false;
}
function handleDotClick({ srcElement }) {
  if (won) return;

  const columnNo = Number(srcElement.id) % n;

  if (heights[columnNo] == -1) return console.log("full column");

  // add dot
  const rowNo = heights[columnNo];
  map[rowNo][columnNo] = player;
  heights[columnNo]--;

  document
    .getElementById(String(rowNo * n + columnNo))
    .classList.add(player == 1 ? "red" : "yellow");
  
  if (checkGrid(rowNo, columnNo)) {
    won = true;
    updateMsg((player == 1 ? "red": "yellow") + " player won!!");
    return;
  }

  player *= -1;
  updateMsg((player == 1 ? "red": "yellow") + " player's turn");
  console.table(map);

  for (const row of map) {
    for (const ele of row) {
      if (ele == 0) return;
    }
  }

  updateMsg("Game ended in Draw!!!");
}

function reset() {
  for (let i = 0; i < n; i++) {
    heights[i] = n - 1;
    for (let j = 0; j < n; j++)
      map[i][j] = 0;
  }
  for (const dot of container.childNodes) {
    if (dot.nodeName == "DIV")
      dot.classList.remove(...dot.classList);
  }
  won = false;
}

window.onload = () => {
  for (const dot of container.childNodes) {
    dot.addEventListener("click", handleDotClick);
  }
};
