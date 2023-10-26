console.log('content script loaded');

let selectedText = '';
function handleSelection() {
  addEventListener('mouseup', () => {
    var userSelection = window.getSelection()?.getRangeAt(0);
    selectedText = userSelection?.toString() ?? '';
  });
}

function renderCreateCommunityNoteButton() {
  // create a circle element that is always positioned on the right bottom of the screen
  const button = document.createElement('button');
  button.style.position = 'fixed';
  button.style.bottom = '20px';
  button.style.right = '20px';
  button.style.width = '35px';
  button.style.height = '35px';
  button.style.borderRadius = '50%';
  button.style.backgroundColor = 'grey';
  button.style.color = 'white';
  button.style.cursor = 'pointer';
  button.style.border = 'none';
  button.style.zIndex = '9999';
  button.style.boxShadow = '0 0 5px rgba(0, 0, 0, 0.3)';

  button.textContent = 'C';

  document.body.appendChild(button);

  button.addEventListener('click', () => {
    console.log('selected text:', selectedText);
    // highlightSelection();
    openPopUp(selectedText);
  });
}

renderCreateCommunityNoteButton();
handleSelection();

/**
 * handle selection
 */
function highlightSelection() {
  var userSelection = window.getSelection()?.getRangeAt(0);
  selectedText = userSelection?.toString() ?? '';
  if (!userSelection) return;

  var safeRanges = getSafeRanges(userSelection);
  for (var i = 0; i < safeRanges.length; i++) {
    highlightRange(safeRanges[i]);
  }
}

function highlightRange(range) {
  var newNode = document.createElement('div');
  newNode.setAttribute('style', 'background-color: yellow; display: inline;');
  range.surroundContents(newNode);
}

function getSafeRanges(dangerous) {
  var a = dangerous.commonAncestorContainer;
  // Starts -- Work inward from the start, selecting the largest safe range
  var s = new Array(0),
    rs = new Array(0);
  if (dangerous.startContainer != a) {
    for (var i = dangerous.startContainer; i != a; i = i.parentNode) {
      s.push(i);
    }
  }
  if (s.length > 0) {
    for (var i = 0; i < s.length; i++) {
      var xs = document.createRange();
      if (i) {
        xs.setStartAfter(s[i - 1]);
        xs.setEndAfter(s[i].lastChild);
      } else {
        xs.setStart(s[i], dangerous.startOffset);
        xs.setEndAfter(s[i].nodeType == Node.TEXT_NODE ? s[i] : s[i].lastChild);
      }
      rs.push(xs);
    }
  }

  // Ends -- basically the same code reversed
  var e = new Array(0),
    re = new Array(0);
  if (dangerous.endContainer != a) {
    for (var i = dangerous.endContainer; i != a; i = i.parentNode) {
      e.push(i);
    }
  }
  if (e.length > 0) {
    for (var i = 0; i < e.length; i++) {
      var xe = document.createRange();
      if (i) {
        xe.setStartBefore(e[i].firstChild);
        xe.setEndBefore(e[i - 1]);
      } else {
        xe.setStartBefore(
          e[i].nodeType == Node.TEXT_NODE ? e[i] : e[i].firstChild
        );
        xe.setEnd(e[i], dangerous.endOffset);
      }
      re.unshift(xe);
    }
  }

  // Middle -- the uncaptured middle
  if (s.length > 0 && e.length > 0) {
    var xm = document.createRange();
    xm.setStartAfter(s[s.length - 1]);
    xm.setEndBefore(e[e.length - 1]);
  } else {
    return [dangerous];
  }

  // Concat
  rs.push(xm);
  const response = rs.concat(re);

  // Send to Console
  return response;
}

/**
 * Popup Form
 */
function openPopUp(text) {
  const popup = document.createElement('div')
  const html = `
  <div style="
    padding: 1em;
    margin: 1em;
    position: absolute;
    border: solid 1px black;
    border-radius: 5px;
    font-size: small;
    bottom: 2em;
    right: 0.5em;
    background: white;
    height: 30em;
    max-width: 30em;
  ">
    <div style="padding: 1em">
      <span>${text}</span>
    </div>
    <form>
      <textarea style="width: 100%; padding: 1em;" placeholder="Your notes here..."></textarea>
    </form>
  </div>
  `
  popup.innerHTML = html;
  document.body.appendChild(popup)
}