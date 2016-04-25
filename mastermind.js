var numRows = 12;
var numColumns = 6;
var currentRow = 0;
var currentColor = 'red';
var currentColorIndex = 0;
var colors = ['red', 'green', 'blue',  'yellow', 'purple', 'orange'];
var currentRowColors = initializeRowColors();
var secret = initializeSecret();

function initializeSecret() {
  var secret = new Array();
  for (var i = 0; i < numColumns; ++i) {
    var color = Math.floor(Math.random() * colors.length);
    secret.push(colors[color]);
  }
  return secret;
}

function initializeRowColors() {
  var rowColors = new Array();
  rowColors.length = numColumns;
  rowColors.fill('white');
  return rowColors;
}

function displayGame() {
  displayRows();
  displayPalette();
}

function displayRows() {
    var container = document.getElementById("game-container");
  var template = container.firstElementChild;
  for (var i = 0; i < numRows; ++i) {
    var copy = template.cloneNode(true);
    var pegTemplate = copy.firstElementChild;
    for (var j = 0; j < numColumns; ++j) {
      var pegCopy = pegTemplate.cloneNode(true);
      pegCopy.onmouseover = (function() {
        var row = i, col = j;
        return function() {
          handlePegHover(this, row, col);
        };
      })();
      pegCopy.onmouseout = (function() {
        var row = i, col = j;
        return function() {
          handlePegUnhover(this, row, col);
        };
      })();
      pegCopy.onclick = (function() {
        var row = i, col = j;
        return function() {
          handlePegClick(this, row, col);
        };
      })();
      copy.insertBefore(pegCopy, copy.lastElementChild);
    }
    copy.removeChild(pegTemplate);
    container.appendChild(copy);
  }
  container.removeChild(template);
}

function handlePegClick(link, row, column) {
  if (row == currentRow) {
    currentRowColors[column] = currentColor;
    link.style.background = currentColor;
    if (isCurrentRowFilledIn()) {
      checkBox = link.parentNode.lastElementChild.firstElementChild;
      checkBox.style.visibility = 'visible';
      checkBox.onclick = (function() {
        var element = checkBox;
        return function() {
          handleCheckClick(element);
        }
      })();
    }
  }
}

function handleCheckClick(element) {
  var checkResult = checkCurrentRow();
  var container = element.parentNode;
  container.removeChild(element);
  var template = container.firstElementChild;
  addPegs(checkResult[0], container, template, "red");
  addPegs(checkResult[1], container, template, "white");
  container.removeChild(template);
  if (checkResult[0] == numColumns || currentRow == numRows - 1) {
    currentRow = -1;
    showSolution();
  } else {
    currentRow++;
    currentRowColors = initializeRowColors();
  }
}

function addPegs(count, container, template, color) {
  for (var i = 0; i < count; ++i) {
    var copy = template.cloneNode(true);
    copy.style.background = color;
    copy.style.visibility = "visible";
    container.appendChild(copy);
  }
}

function showSolution() {
  var container = document.getElementById("solution");
  var template = container.firstElementChild;
  for (var i = 0; i < secret.length; ++i) {
    var copy = template.cloneNode(true);
    copy.style.background = secret[i];
    copy.style.visibility = "visible";
    container.appendChild(copy);
  }
  container.removeChild(template);
}

function isCurrentRowFilledIn() {
  for (var i = 0; i < currentRowColors.length; ++i) {
    if (currentRowColors[i] == 'white') {
      return false;
    }
  }
  return true;
}

function checkCurrentRow() {
  var secretHistogram = new Object();
  var guessHistogram = new Object();
  var exact = 0, partial = 0;
  for (var i = 0; i < numColumns; ++i) {
    if (currentRowColors[i] == secret[i]) {
      ++exact;
    } else {
      incrementColor(secretHistogram, secret[i]);
      incrementColor(guessHistogram, currentRowColors[i]);
    }
  }
  for (var i = 0; i < colors.length; ++i) {
    partial += minColor(secretHistogram, guessHistogram, colors[i]);
  }
  return [exact, partial];
}

function incrementColor(histogram, color) {
  if (typeof histogram[color] == "undefined") {
    histogram[color] = 1;
  } else {
    histogram[color]++;
  }
}

function minColor(histogram1, histogram2, color) {
  if (typeof histogram1[color] == "undefined"
      || typeof histogram2[color] == "undefined") {
    return 0;
  }
  return Math.min(histogram1[color], histogram2[color]);
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

function displayPalette() {
  container = document.getElementById("palette");
  template = container.firstElementChild;
  for (var i = 0; i < colors.length; ++i) {
    var copy = template.cloneNode(true);
    copy.style.background = colors[i];
    if (i == currentColorIndex) {
      copy.style.borderWidth = "4px";
    }
    copy.onclick = (function() {
      var colorIndex = i;
      var parent = container;
      return function() {
        handlePaletteClick(colorIndex, parent);
      };
    })();
    container.appendChild(copy);
  }
  container.removeChild(template);
}

function handlePaletteClick(colorIndex, parent) {
  parent.children[currentColorIndex].style.borderWidth = "2px";
  currentColorIndex = colorIndex;
  currentColor = colors[colorIndex];
  parent.children[colorIndex].style.borderWidth = "4px";
}
