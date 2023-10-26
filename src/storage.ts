export function storeNote(url: string, note: string) {
  const data = {
    [url]: {note},
  };
  chrome.storage.local.set(data);
}

export function getNote() {
  chrome.storage.local.get(window.location.href, (data) => {
    console.log('Notes for this page:', data);
  });
}
