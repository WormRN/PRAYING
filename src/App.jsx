import { useState, useEffect } from 'react';
import {
  SECTIONS, sectionByKey, promotePrompts, sectionPrompts,
  askPrompts, DAYS, CATEGORIES,
} from './data/content';
import { getPeopleForDay, savePerson, deletePerson, initials } from './lib/storage';
import FocusMode from './components/FocusMode';
import {
  ArrowLeft, ArrowUpRight, Play, Plus, Pencil, Trash,
  Shield, ShieldLock, Users, ChevronRight,
} from './components/Icons';

export default function App() {
  const [view, setView] = useState({ name: 'home' });
  const [focus, setFocus] = useState(null);

  const openSection = (key) => { setView({ name: 'section', key }); window.scrollTo(0, 0); };
  const goHome = () => setView({ name: 'home' });

  return (
    <div className="app-shell">
      {view.name === 'home' && <Home onOpen={openSection} onBegin={() => openSection('P')} />}
      {view.name === 'section' && (
        <Section sectionKey={view.key} onBack={goHome} onFocus={setFocus} onNav={openSection} />
      )}
      {focus && (
        <FocusMode
          section={focus.section}
          items={focus.items}
          startIndex={focus.startIndex || 0}
          onClose={() => setFocus(null)}
        />
      )}
    </div>
  );
}

/* ---------------- HOME ---------------- */
function Home({ onOpen, onBegin }) {
  return (
    <>
      <div className="header center">
        <div className="header-eyebrow">Matthew 6:9&ndash;13</div>
        <div className="header-title">P.R.A.Y.I.N.G.</div>
        <div className="header-subtitle">The pattern of the Lord's prayer</div>
      </div>
      <div className="color-strip">
        {SECTIONS.map((s) => <span key={s.key} style={{ background: s.color }} />)}
      </div>
      <div className="scroll">
        {SECTIONS.map((s) => (
          <button key={s.key} className="section-card" onClick={() => onOpen(s.key)}>
            <span className="section-letter" style={{ color: s.color }}>{s.key}</span>
            <span className="section-card-body">
              <span className="section-card-label" style={{ color: s.color }}>
                {s.key} &middot; {s.word.toUpperCase()}
                <ArrowUpRight size={14} style={{ opacity: 0.5 }} />
              </span>
              <span className="section-card-name">{s.title}</span>
              <span className="section-card-verse">{s.subtitle}</span>
            </span>
          </button>
        ))}
        <div className="begin-bar">
          <button className="begin-btn" onClick={onBegin}>
            <Play size={15} /> Begin praying
          </button>
        </div>
        <div className="footer">Formed For More</div>
      </div>
    </>
  );
}

/* ---------------- SECTION ROUTER ---------------- */
function Section({ sectionKey, onBack, onFocus, onNav }) {
  const section = sectionByKey(sectionKey);
  const idx = SECTIONS.findIndex((s) => s.key === sectionKey);
  const nextKey = idx < SECTIONS.length - 1 ? SECTIONS[idx + 1].key : null;

  return (
    <>
      <div className="header">
        <button className="back-btn" onClick={onBack}>
          <ArrowLeft size={15} /> {section.key} &middot; {section.word.toUpperCase()}
        </button>
        <div className="header-title lg" style={{ marginTop: 4 }}>{section.title}</div>
        <div className="header-subtitle">{section.subtitle}</div>
      </div>
      <div className="accent-bar" style={{ background: section.color }} />
      <div className="scroll">
        {section.kind === 'worship' && <PromoteBody section={section} onFocus={onFocus} />}
        {section.kind === 'statement' && <StatementBody section={section} onFocus={onFocus} />}
        {section.kind === 'ask' && <AskBody section={section} onFocus={onFocus} />}
        <NextSection nextKey={nextKey} onNav={onNav} />
      </div>
    </>
  );
}

function NextSection({ nextKey, onNav }) {
  if (!nextKey) return <div className="footer">Formed For More</div>;
  const next = sectionByKey(nextKey);
  return (
    <button className="section-card" style={{ borderTop: '0.5px solid var(--rule)' }} onClick={() => onNav(nextKey)}>
      <span className="section-letter" style={{ color: next.color }}>{next.key}</span>
      <span className="section-card-body">
        <span className="section-card-label" style={{ color: next.color }}>NEXT &middot; {next.word.toUpperCase()}</span>
        <span className="section-card-name">{next.title}</span>
      </span>
      <ChevronRight size={18} style={{ color: 'var(--muted-light)', alignSelf: 'center' }} />
    </button>
  );
}

/* ---------------- PROMOTE ---------------- */
function PromoteBody({ section, onFocus }) {
  const items = promotePrompts.map((p) => ({
    headline: p.name.length < 24 ? `You are ${p.name.replace(/^The /, 'the ')}.` : p.name,
    sub: p.desc,
    ref: p.ref,
    scripture: p.text,
    seeAlso: p.seeAlso,
    instruction: p.instruction,
  }));

  return (
    <>
      <div className="intro-text">
        Speak these truths to God. Pause on whatever stirs your heart. This is worship &mdash;
        assigning tremendous worth to the One you're praying to.
      </div>
      <div className="begin-bar" style={{ borderTop: 'none', paddingBottom: 8 }}>
        <button className="begin-btn" style={{ background: section.color }}
          onClick={() => onFocus({ section, items, startIndex: 0 })}>
          <Play size={15} /> Worship through all {items.length}
        </button>
      </div>
      {promotePrompts.map((p, idx) => (
        <button key={p.id} className="prompt-row"
          onClick={() => onFocus({ section, items, startIndex: idx })}>
          <span className="prompt-circle" style={{ background: `color-mix(in srgb, ${section.color} 10%, transparent)`, color: section.color }}>
            {p.initial}
          </span>
          <span className="prompt-row-body">
            <span className="prompt-name">{p.name}</span>
            <span className="prompt-desc">{p.desc}</span>
            <span className="prompt-ref" style={{ color: section.color }}>{p.ref}</span>
          </span>
        </button>
      ))}
    </>
  );
}

/* ---------------- STATEMENT SECTIONS (R, Y, I, N, G) ---------------- */
function StatementBody({ section, onFocus }) {
  const prompts = sectionPrompts[section.key] || [];
  const items = prompts.map((p) => ({
    headline: p.text,
    sub: p.guidance || '',
    ref: p.ref,
    scripture: p.scripture,
    seeAlso: p.seeAlso,
    instruction: '',
  }));

  const groups = {};
  prompts.forEach((p, idx) => {
    const g = p.group || '';
    (groups[g] = groups[g] || []).push({ p, idx });
  });

  return (
    <>
      <div className="begin-bar" style={{ borderTop: 'none', paddingBottom: 8 }}>
        <button className="begin-btn" style={{ background: section.color }}
          onClick={() => onFocus({ section, items, startIndex: 0 })}>
          <Play size={15} /> Pray through all {items.length}
        </button>
      </div>
      {Object.entries(groups).map(([g, list]) => (
        <div key={g || 'none'}>
          {g && <div className="section-subhead" style={{ color: section.color }}>{g}</div>}
          {list.map(({ p, idx }) => (
            <button key={p.id} className="statement"
              onClick={() => onFocus({ section, items, startIndex: idx })}>
              <span className="statement-bar" style={{ background: section.color }} />
              <span className="statement-body">
                <span className="statement-text">{p.text}</span>
                {p.ref && <span className="statement-ref">{p.ref}</span>}
              </span>
            </button>
          ))}
        </div>
      ))}
    </>
  );
}

/* ---------------- ASK ---------------- */
function AskBody({ section, onFocus }) {
  const today = new Date().getDay();
  const [day, setDay] = useState(today);
  const [people, setPeople] = useState([]);
  const [editing, setEditing] = useState(null);
  const [version, setVersion] = useState(0);

  useEffect(() => { setPeople(getPeopleForDay(day)); }, [day, version]);

  const daysWithItems = new Set();
  for (let d = 0; d < 7; d++) if (getPeopleForDay(d).length) daysWithItems.add(d);

  const items = askPrompts.map((p) => ({
    headline: p.text, sub: '', ref: p.ref, scripture: p.scripture,
    seeAlso: p.seeAlso, instruction: '',
  }));

  return (
    <>
      <div className="day-tabs">
        {DAYS.map((d, idx) => (
          <button key={d}
            className={'day-tab' + (idx === day ? ' active' : '') + (daysWithItems.has(idx) ? ' has-items' : '')}
            style={idx === day ? { background: section.color, color: '#fff' } : {}}
            onClick={() => setDay(idx)}>{d[0]}</button>
        ))}
      </div>

      <div className="section-subhead" style={{ color: section.color }}>
        {day === today ? "Today's list" : `${DAYS[day]}'s list`}
      </div>

      {people.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon"><Users size={26} /></div>
          <div className="empty-title">Who would you like to pray for?</div>
          <div className="empty-sub">
            Add the people on your heart for {fullDay(day)}. This list is private and stays on your device.
          </div>
          <button className="begin-btn" style={{ background: section.color, maxWidth: 240 }}
            onClick={() => setEditing({ days: [day], category: CATEGORIES[0] })}>
            <Plus size={15} /> Add someone
          </button>
          <div className="privacy-inline" style={{ marginTop: 18 }}>
            <Shield size={14} /> Stored only on your device
          </div>
        </div>
      ) : (
        <>
          {people.map((p) => (
            <button key={p.id} className="person-row" onClick={() => setEditing(p)}>
              <span className="person-avatar">{initials(p.name)}</span>
              <span className="person-info">
                <span className="person-name">{p.name}</span>
                {p.note && <span className="person-note">{p.note}</span>}
              </span>
              <Pencil size={15} style={{ color: 'var(--muted-light)', alignSelf: 'center' }} />
            </button>
          ))}
          <button className="add-btn"
            style={{ borderColor: `color-mix(in srgb, ${section.color} 35%, transparent)`, color: section.color }}
            onClick={() => setEditing({ days: [day], category: CATEGORIES[0] })}>
            <Plus size={15} /> Add someone to {DAYS[day]}
          </button>
          <div className="privacy-inline"><Shield size={14} /> Stored only on your device</div>
        </>
      )}

      <div className="section-subhead" style={{ color: section.color, marginTop: 8 }}>How to pray for them</div>
      <div className="intro-text" style={{ borderTop: '0.5px solid var(--rule)' }}>
        Prompts drawn from the prayer of Jesus in John 17 and the letters of Paul.
      </div>
      <button className="begin-btn"
        style={{ background: section.color, margin: '12px 22px 0', width: 'calc(100% - 44px)' }}
        onClick={() => onFocus({ section, items, startIndex: 0 })}>
        <Play size={15} /> Pray through all {items.length}
      </button>
      <div className="spacer" />

      {editing && (
        <PersonEditor section={section} person={editing}
          onCancel={() => setEditing(null)}
          onSave={(p) => { savePerson(p); setEditing(null); setVersion((v) => v + 1); }}
          onDelete={(id) => { deletePerson(id); setEditing(null); setVersion((v) => v + 1); }} />
      )}
    </>
  );
}

function fullDay(idx) {
  return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][idx];
}

/* ---------------- PERSON EDITOR ---------------- */
function PersonEditor({ section, person, onCancel, onSave, onDelete }) {
  const [name, setName] = useState(person.name || '');
  const [note, setNote] = useState(person.note || '');
  const [days, setDays] = useState(person.days || []);
  const [category, setCategory] = useState(person.category || CATEGORIES[0]);
  const isNew = !person.id;
  const accent = section.color;

  const toggleDay = (idx) =>
    setDays((d) => d.includes(idx) ? d.filter((x) => x !== idx) : [...d, idx]);

  return (
    <div className="editor">
      <div className="editor-top">
        <button className="editor-cancel" onClick={onCancel}>Cancel</button>
        <span className="editor-title">{isNew ? 'Add to list' : 'Edit'}</span>
        <button className="editor-save" style={{ color: accent }} disabled={!name.trim()}
          onClick={() => onSave({ ...person, name: name.trim(), note: note.trim(), days, category })}>
          Save
        </button>
      </div>
      <div className="scroll">
        <div className="field">
          <div className="field-label">Name</div>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Who are you praying for?" autoFocus />
        </div>
        <div className="field">
          <div className="field-label">What to pray</div>
          <textarea rows={3} value={note} onChange={(e) => setNote(e.target.value)}
            placeholder="Optional &mdash; a need, a hope, a verse" />
        </div>
        <div className="field">
          <div className="field-label">Day(s) to pray</div>
          <div className="chip-row">
            {DAYS.map((d, idx) => (
              <button key={d} className={'chip' + (days.includes(idx) ? ' on' : '')}
                style={days.includes(idx) ? { background: accent, borderColor: accent } : {}}
                onClick={() => toggleDay(idx)}>{d}</button>
            ))}
          </div>
        </div>
        <div className="field">
          <div className="field-label">Category</div>
          <div className="chip-row">
            {CATEGORIES.map((c) => (
              <button key={c} className={'chip cat-chip' + (category === c ? ' on' : '')}
                style={category === c ? { background: `color-mix(in srgb, ${accent} 12%, transparent)`, color: accent, borderColor: `color-mix(in srgb, ${accent} 35%, transparent)` } : {}}
                onClick={() => setCategory(c)}>{c}</button>
            ))}
          </div>
        </div>
        <div className="privacy-box">
          <div className="privacy-shield"><ShieldLock size={17} /></div>
          <div className="privacy-copy">
            <strong>Your prayers stay on this device.</strong> Nothing is uploaded, synced, or shared.
            No account needed. Only you can see this.
          </div>
        </div>
        {!isNew && (
          <button className="delete-row" onClick={() => onDelete(person.id)}>
            <Trash size={15} /> Remove from list
          </button>
        )}
      </div>
    </div>
  );
}
