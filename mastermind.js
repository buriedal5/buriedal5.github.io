var currentRow = 0;
var currentColor = 'red';
var colors = ['red', 'green', 'blue',  'yellow', 'purple', 'orange'];
var currentRowColors = ['white', 'white', 'white', 'white']
var secret = initializeSecret();

function initializeSecret() {
  var secret = new Array();
  for (var i = 0; i < 4; ++i) {
    var color = Math.floor(Math.random() * 6);
    secret.push(colors[color]);
  }
  return secret;
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
          var checkResult = checkCurrentRow();
          var container = element.parentNode;
          container.removeChild(element);
          var template = container.firstElementChild;
          for (var i = 0; i < checkResult[0]; ++i) {
            var copy = template.cloneNode(true);
            copy.style.background = "red";
            copy.style.visibility = "visible";
            container.appendChild(copy);
          }
          for (var i = 0; i < checkResult[1]; ++i) {
            var copy = template.cloneNode(true);
            copy.style.background = "white";
            copy.style.visibility = "visible";
            container.appendChild(copy);
          }
          container.removeChild(template);
          if (checkResult[0] == 4) {
            currentRow = -1;
            showSolution();
          } else if (currentRow == 12) {
            currentRow = -1;
            showSolution();
          } else {
            currentRow++;
            currentRowColors = ['white', 'white', 'white', 'white'];
          }
        }
      })();
    }
  }
}

function showSolution() {
  var container = document.getElementById("solution");
  var template = container.firstElementChild();
  for (int i = 0; i < secret.length; ++i) {
    var copy = template.cloneNode(true);
    copy.style.background = secret[i];
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

function checkCurrentRow() {
  var secretHistogram = new Object();
  var guessHistogram = new Object();
  var exact = 0, partial = 0;
  for (var i = 0; i < 4; ++i) {
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

function displayGame(numRows) {
  var container = document.getElementById("game-container");
  var template = container.firstElementChild;
  for (var i = 0; i < numRows; ++i) {
    var copy = template.cloneNode(true);
    var pegTemplate = copy.firstElementChild;
    for (var j = 0; j < 4; ++j) {
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
