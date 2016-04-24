var currentRow = 0;
var currentColor = 0;
var colors = ['red', 'green', 'blue',  'yellow', 'purple', 'orange'];

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

function handlePegUnhover(link, row, column) {
  if (row == currentRow) {
    link.style.background = 'white';
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
      copy.children[j].onmouseout = (function() {
        var row = i, col = j;
        return function() {
          handlePegUnhover(this, row, col);
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
  
  container = document.getElementById("palette");
  template = container.firstElementChild;
  for (var i = 0; i < colors.length; ++i) {
    var copy = template.cloneNode(true);
    copy.style.background = colors[i];
  }
  container.removeChild(template);
}
