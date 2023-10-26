console.log('content script loaded');

let selectedText = '';
function handleSelection() {
  document.addEventListener('selectionchange', () => {
    const range = document.getSelection();
    if (!range) return;
    selectedText = range.toString();
  });
}

function highlightRange(range) {
  console.log('>>> highlighting text', range.toString());
}

function renderCreateCommunityNoteButton() {
  // create a circle element that is always positioned on the right bottom of the screen
  const bubble = document.createElement('button');
  bubble.style.position = 'fixed';
  bubble.style.top = '20px';
  bubble.style.right = '20px';
  bubble.style.width = '35px';
  bubble.style.height = '35px';
  bubble.style.borderRadius = '50%';
  bubble.style.backgroundColor = 'grey';
  bubble.style.color = 'white';
  bubble.style.cursor = 'pointer';
  bubble.style.border = 'none';
  bubble.style.zIndex = '9999';

  bubble.textContent = 'C';

  document.body.appendChild(bubble);

  bubble.addEventListener('click', () => {
    console.log('selected text:', selectedText);
  });
}

renderCreateCommunityNoteButton();
handleSelection();
