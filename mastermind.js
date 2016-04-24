function clickPeg(row, column) {
  window.alert("click " + row + ":" + column);
}

function displayGame(numRows) {
  var container = document.getElementById("game-container");
  var template = container.firstChild;
  for (var i = 0; i < numRows; ++i) {
    var copy = template.cloneNode();
    container.appendChild(copy);
  }
  container.removeChild(template);
}
