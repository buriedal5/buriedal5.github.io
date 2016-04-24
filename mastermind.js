var currentRow = 0;
var currentColor = 0;
var colors = [0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0x00ffff]

function handlePegClick(row, column) {
  if (row == currentRow) {
    window.alert("click " + row + ":" + column);
  }
}

function handlePegHover(link, row, column) {
  if (row == currentRow) {
    link.style.background = colors[currentColor];
  }
}

function displayGame(numRows) {
  var container = document.getElementById("game-container");
  var template = container.firstElementChild;
  for (var i = 0; i < numRows; ++i) {
    var copy = template.cloneNode(true);
    for (var j = 0; j < 4; ++j) {
      copy.children[j].onmouseover = (function() {
        var row = i, col = j;
        return function() {
          handlePegHover(this, row, col);
        };
      })();
      copy.children[j].onclick = (function() {
        var row = i, col = j;
        return function() {
          handlePegClick(row, col);
        };
      })();
    }
    container.appendChild(copy);
  }
  container.removeChild(template);
}
