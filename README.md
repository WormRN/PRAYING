# P.R.A.Y.I.N.G. — Formed For More

A private prayer guide that walks through the seven requests of the Lord's Prayer
(Matthew 6:9–13) using the P.R.A.Y.I.N.G. pattern:

- **P** — Promote God's name (worship)
- **R** — Release control (surrender)
- **A** — Ask for provision (your private prayer lists, by day of week)
- **Y** — Yearn for forgiveness (confession)
- **I** — Invite a forgiving spirit
- **N** — Navigate temptation
- **G** — Guard from evil

## Privacy

Personal prayer lists are stored **only on the user's device** (browser
localStorage). Nothing is uploaded, synced, or shared. No account, no server,
no cloud database. The app works fully offline once installed.

## Tech

- React + Vite
- Installable PWA (offline-capable via service worker)
- All prompt content lives in `src/data/database.json`

## Run locally

```bash
npm install
npm run dev      # development server
npm run build    # production build into /dist
npm run preview  # preview the production build
```

## Updating prompt content

All prompts come from `src/data/database.json`, which was generated from the
master spreadsheet (`PRAYING_Prompt_Database.xlsx`). To change wording, add
prompts, or fix a scripture reference, edit the spreadsheet and re-export, or
edit the JSON directly. The eight sections map to: promote, worship365,
release, ask, yearn, invite, navigate, guard.
