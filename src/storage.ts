export interface Note {
  title: string; // The title of the webpage
  note: string; // The provided note
  domain: string; // The domain
  url: string; // The url
  selectedText: string; // The selected text for which the note was created
}

export async function storeNote(key: string, note: Note) {
  const notes = await getNotes(key);

  notes.push(note);

  chrome.storage.local.set({[key]: notes});
}

export async function getNotes(key: string) {
  return (
    await chrome.storage.local.get({
      [key]: [],
    })
  )[key];
}
