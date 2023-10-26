console.log('content script loaded');

function handleSelection(){
  document.addEventListener('selectionchange', () => {
    const range = document.getSelection() ?? ''
    highlightRange(range);
  });
}

function highlightRange(range) {
  console.log('>>> highlighting text', range.toString())
  var newNode = document.createElement("div");
  newNode.setAttribute(
     "style",
     "background-color: yellow; display: inline;"
  );
  range.surroundContents(newNode);
}

function renderBubble() {
  console.log('>>> rendering bubble')
}

renderBubble();
handleSelection();