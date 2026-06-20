# basescout
Discover Base tokens before the crowd.

# Technologies
| Layer       | Technology      |
| ----------- | --------------- |
| Frontend    | Next.js 15      |
| Language    | TypeScript      |
| UI          | Tailwind CSS    |
| Icons       | Lucide          |
| Data Source | DexScreener API |
| Deployment  | Vercel          |
| Database    | None (for now)  |

# Folder Structure

basescout/

├── app/
│   ├── page.tsx
│   ├── token/
│   │   └── [address]/
│   │       └── page.tsx
│   └── api/
│
├── components/
│   ├── Header.tsx
│   ├── TokenTable.tsx
│   ├── TokenCard.tsx
│   ├── ThemeToggle.tsx
│
├── lib/
│   ├── dexscreener.ts
│   ├── trustScore.ts
│
├── types/
│   └── token.ts
│
├── public/
│
└── README.md
