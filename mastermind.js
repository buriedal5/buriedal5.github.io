var currentRow = 0;
var currentColor = 'red';
var colors = ['red', 'green', 'blue',  'yellow', 'purple', 'orange'];
var currentRowColors = ['white', 'white', 'white', 'white']

function handlePegClick(link, row, column) {
  if (row == currentRow) {
    currentRowColors[column] = currentColor;
    link.style.background = currentColor;
  }
}

function handlePegHover(link, row, column) {
  if (row == currentRow) {
    link.style.background = currentColor;
  }
}

function handlePegUnhover(link, row, column) {
  if (row == currentRow) {
    link.style.background = currentRowColors[column];
  }
}

function displayGame(numRows) {
  var container = document.getElementById("game-container");
  var template = container.firstElementChild;
  for (var i = 0; i < numRows; ++i) {
    var copy = template.cloneNode(true);
    if (i == currentRow) {
      copy.lastElementChild.style.visibility = 'visible';
    }
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
          handlePegClick(this, row, col);
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
    copy.onclick = (function() {
      var color = colors[i];
      return function() {
        currentColor = color;
      };
    })();
    container.appendChild(copy);
  }
  container.removeChild(template);
}
