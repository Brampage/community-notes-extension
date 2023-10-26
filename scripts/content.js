console.log('content script loaded');

document.addEventListener('selectionchange', () => {
  console.log(document.getSelection().toString());
});
