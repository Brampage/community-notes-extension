export async function storeNote(key: string, note: string) {
  const notes = await getNotes(key);

  notes[key].push({ note });

  chrome.storage.local.set(notes);
}

export async function getNotes(key: string) {
  return await chrome.storage.local.get({
    [key]: [],
  });
}
