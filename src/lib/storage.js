// ============================================================
// On-device storage. Nothing here ever leaves the user's device.
// Uses localStorage — private to this app, persistent across sessions.
// ============================================================

const KEY = 'ffm_praying_people_v1';

function readAll() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeAll(people) {
  try {
    localStorage.setItem(KEY, JSON.stringify(people));
  } catch {
    /* storage full or unavailable — fail quietly */
  }
}

export function getPeople() {
  return readAll();
}

export function getPeopleForDay(dayIndex) {
  return readAll().filter((p) => (p.days || []).includes(dayIndex));
}

export function savePerson(person) {
  const people = readAll();
  if (person.id) {
    const idx = people.findIndex((p) => p.id === person.id);
    if (idx >= 0) people[idx] = person;
    else people.push(person);
  } else {
    person.id = 'p_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7);
    people.push(person);
  }
  writeAll(people);
  return person;
}

export function deletePerson(id) {
  writeAll(readAll().filter((p) => p.id !== id));
}

export function initials(name) {
  const parts = (name || '').trim().split(/[\s&/]+/).filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}
