console.log('content script loaded');

function createButton() {
  const button = document.createElement('button');
  button.style.backgroundColor = 'red';
  button.style.color = 'white';
  button.textContent = 'x';
  button.style.borderRadius = '50%';
  button.style.border = 'none';
  button.style.width = '20px';
  button.style.height = '20px';
  button.style.position = 'absolute';
  button.style.top = '0';
  button.style.right = '0';
  button.style.zIndex = '9999';
  button.style.cursor = 'pointer';
  button.addEventListener('click', () => {});

  return button;
}

function handleSelection() {
  const isButtonAdded = false;
  document.addEventListener('selectionchange', () => {
    if (isButtonAdded) return;

    const selection = document.getSelection();
    if (!selection) return;
    const range = selection.getRangeAt(0);
    const button = createButton();

    // append button to the body
    document.body.appendChild(button);

    // get boundingbox of the parentElement
    const boundingBox = range.getBoundingClientRect();
    console.log('>>> boundingBox', boundingBox);

    // change the position of the button to the boundingBox
    button.style.top = `${boundingBox.top}px`;
    button.style.right = `${boundingBox.right}px`;

    isButtonAdded = true;
  });
}

function highlightRange(range) {
  console.log('>>> highlighting text', range.toString());
}

function renderBubble() {
  console.log('>>> rendering bubble');
}

renderBubble();
handleSelection();
