import { useState } from 'react';
import { Close, ArrowLeft, ArrowRight, Bookmark, PlusCircle, Minus } from './Icons';

// items: [{ headline, sub, ref, scripture, seeAlso: [refs], instruction }]
export default function FocusMode({ section, items, startIndex = 0, onClose }) {
  const [i, setI] = useState(startIndex);
  const [showAlso, setShowAlso] = useState(false);
  const color = section.color;
  const item = items[i];
  if (!item) return null;

  const go = (next) => {
    setShowAlso(false);
    setI(next);
  };

  const tint = (alpha) =>
    color.replace('var(--c-', '').replace(')', '');

  return (
    <div className="focus">
      <div className="focus-top">
        <button className="focus-icon-btn" onClick={onClose} aria-label="Close"><Close /></button>
        <span className="focus-step">{i + 1} of {items.length}</span>
        <button className="focus-icon-btn" aria-label="Bookmark"><Bookmark size={18} /></button>
      </div>

      <div style={{ padding: '0 28px' }}>
        <div className="focus-section-label" style={{ color }}>
          {section.key} · {section.title}
        </div>
        <div className="focus-progress">
          {items.map((_, idx) => (
            <span key={idx} style={{
              background: idx < i ? `color-mix(in srgb, ${color} 40%, transparent)`
                : idx === i ? color : 'rgba(12,35,64,0.1)',
            }} />
          ))}
        </div>
      </div>

      <div className="focus-body">
        <div className={'focus-prompt' + (item.headline.length > 40 ? ' sm' : '')}>
          {item.headline}
        </div>
        {item.sub && <div className="focus-prompt-sub">{item.sub}</div>}

        {item.scripture && (
          <div className="scripture-block" style={{ background: `color-mix(in srgb, ${color} 6%, transparent)` }}>
            <div className="scripture-ref-label" style={{ color }}>{item.ref}</div>
            <div className="scripture-text">{item.scripture}</div>
          </div>
        )}

        {item.instruction && <div className="focus-instruction">{item.instruction}</div>}

        {item.seeAlso && item.seeAlso.length > 0 && (
          <div style={{ marginTop: 4 }}>
            <button className="see-also-btn" style={{ color }}
              onClick={() => setShowAlso((v) => !v)}>
              {showAlso ? <Minus size={15} /> : <PlusCircle size={15} />}
              {showAlso ? 'Hide references' : `${item.seeAlso.length} more reference${item.seeAlso.length > 1 ? 's' : ''}`}
            </button>
            {showAlso && (
              <div style={{ marginTop: 8 }}>
                {item.seeAlso.map((ref, idx) => (
                  <div key={idx} className="see-also-item"
                    style={{ background: `color-mix(in srgb, ${color} 5%, transparent)`,
                      borderLeft: `2px solid color-mix(in srgb, ${color} 35%, transparent)` }}>
                    <div className="see-also-ref" style={{ color }}>{ref}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="focus-controls">
        <button className="focus-nav-btn" disabled={i === 0} onClick={() => go(i - 1)} aria-label="Previous">
          <ArrowLeft />
        </button>
        {i < items.length - 1 ? (
          <button className="focus-next" style={{ background: color }} onClick={() => go(i + 1)}>
            Next <ArrowRight size={16} />
          </button>
        ) : (
          <button className="focus-next" style={{ background: color }} onClick={onClose}>
            Finish
          </button>
        )}
      </div>
    </div>
  );
}
