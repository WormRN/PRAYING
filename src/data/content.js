import db from './database.json';

// The seven requests of the Lord's Prayer — the P.R.A.Y.I.N.G. pattern
export const SECTIONS = [
  { key: 'P', word: 'Promote', title: "Promote God's name", subtitle: 'Hallowed be your name', color: 'var(--c-P)', kind: 'worship' },
  { key: 'R', word: 'Release', title: 'Release control', subtitle: 'Your kingdom come, your will be done', color: 'var(--c-R)', kind: 'statement' },
  { key: 'A', word: 'Ask', title: 'Ask for provision', subtitle: 'Give us this day our daily bread', color: 'var(--c-A)', kind: 'ask' },
  { key: 'Y', word: 'Yearn', title: 'Yearn for forgiveness', subtitle: 'Forgive us our debts', color: 'var(--c-Y)', kind: 'statement' },
  { key: 'I', word: 'Invite', title: 'Invite a forgiving spirit', subtitle: 'As we forgive our debtors', color: 'var(--c-I)', kind: 'statement' },
  { key: 'N', word: 'Navigate', title: 'Navigate temptation', subtitle: 'Lead us not into temptation', color: 'var(--c-N)', kind: 'statement' },
  { key: 'G', word: 'Guard', title: 'Guard from evil', subtitle: 'Deliver us from the evil one', color: 'var(--c-G)', kind: 'statement' },
];

export const sectionByKey = (k) => SECTIONS.find((s) => s.key === k);

const splitRefs = (s) =>
  (s || '').split(';').map((r) => r.trim()).filter(Boolean);

// ---- PROMOTE: worship prompts (names & attributes of God) ----
export const promotePrompts = db.promote.map((r) => ({
  id: r.ID,
  name: r['Name / Attribute'],
  desc: r.Description,
  ref: r['Primary Scripture'],
  text: r['Primary Scripture Text (BSB)'],
  seeAlso: splitRefs(r['See Also References']),
  theme: r['Theme Group'],
  initial: (r['Name / Attribute'] || '?').replace(/^The /, '').charAt(0),
  instruction: 'Dwell here. Tell Him why this truth fills you with awe.',
}));

// ---- WORSHIP 365: 52 names x 7 references, year-long rotation ----
export const worship365 = db.worship365.map((r) => ({
  week: r.Week,
  hebrew: r['Name (Hebrew)'],
  english: r['Name (English)'],
  day: r.Day,
  ref: r['Scripture Reference'],
  phrase: r['Key Phrase (BSB)'],
}));

// ---- Generic statement-style sections (R, Y, I, N, G) ----
const mapStatements = (rows, textKey) =>
  rows.map((r, i) => ({
    id: r.ID,
    text: r[textKey],
    guidance: r.Guidance || '',
    ref: r['Primary Scripture'],
    scripture: r['Primary Scripture Text (BSB)'],
    seeAlso: splitRefs(r['See Also References']),
    group: r.Type || r.Area || '',
  }));

export const sectionPrompts = {
  R: mapStatements(db.release, 'Prompt Statement'),
  Y: mapStatements(db.yearn, 'Confession Prompt'),
  I: mapStatements(db.invite, 'Forgiveness Prompt'),
  N: mapStatements(db.navigate, 'Resistance Prompt'),
  G: mapStatements(db.guard, 'Protection Prompt'),
};

// ---- ASK: prayer prompts for others (John 17 etc.) ----
export const askPrompts = db.ask.map((r) => ({
  id: r.ID,
  text: r['Prayer Prompt'],
  ref: r['Primary Scripture'],
  scripture: r['Primary Scripture Text (BSB)'],
  seeAlso: splitRefs(r['See Also References']),
  forWhom: r.For,
  source: r.Source,
}));

export const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
export const CATEGORIES = ['Friends / family', 'Church', 'Children', 'For me', 'Enemies'];
