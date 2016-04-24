function handlePegClick(row, column) {
  window.alert("click " + row + ":" + column);
}

function displayGame(numRows) {
  var container = document.getElementById("game-container");
  var template = container.firstElementChild;
  for (var i = 0; i < numRows; ++i) {
    var copy = template.cloneNode(true);
    for (var j = 0; j < 4; ++j) {
      copy.children[j].onclick = function() {
        var row = i, col = j;
        return function() {
          handlePegClick(row, col);
        }};
    }
    container.appendChild(copy);
  }
  container.removeChild(template);
}
