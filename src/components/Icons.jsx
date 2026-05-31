// Minimal inline SVG icons. Stroke-based, inherit color via currentColor.
const S = ({ children, size = 20, ...p }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
    {children}
  </svg>
);

export const ArrowLeft = (p) => <S {...p}><path d="M19 12H5" /><path d="M12 19l-7-7 7-7" /></S>;
export const ArrowRight = (p) => <S {...p}><path d="M5 12h14" /><path d="M12 5l7 7-7 7" /></S>;
export const ChevronRight = (p) => <S {...p}><path d="M9 18l6-6-6-6" /></S>;
export const ArrowUpRight = (p) => <S {...p}><path d="M7 17L17 7" /><path d="M7 7h10v10" /></S>;
export const Play = (p) => <S {...p}><polygon points="6 4 20 12 6 20 6 4" /></S>;
export const Close = (p) => <S {...p}><path d="M18 6L6 18" /><path d="M6 6l12 12" /></S>;
export const Plus = (p) => <S {...p}><path d="M12 5v14" /><path d="M5 12h14" /></S>;
export const PlusCircle = (p) => <S {...p}><circle cx="12" cy="12" r="10" /><path d="M12 8v8" /><path d="M8 12h8" /></S>;
export const Pencil = (p) => <S {...p}><path d="M12 20h9" /><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" /></S>;
export const Trash = (p) => <S {...p}><path d="M3 6h18" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></S>;
export const Shield = (p) => <S {...p}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></S>;
export const ShieldLock = (p) => <S {...p}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M12 11v3" /><circle cx="12" cy="10" r="0.5" /></S>;
export const Bookmark = (p) => <S {...p}><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" /></S>;
export const Users = (p) => <S {...p}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></S>;
export const Minus = (p) => <S {...p}><path d="M5 12h14" /></S>;
