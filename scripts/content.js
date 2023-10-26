console.log('content script loaded');

function handleSelection(){
  document.addEventListener('selectionchange', () => {
    const range = document.getSelection() ?? ''
    highlightRange(range);
  });
}

function highlightRange(range) {
  console.log('>>> highlighting text', range.toString())
}

function renderBubble() {
  console.log('>>> rendering bubble')
}

renderBubble();
handleSelection();