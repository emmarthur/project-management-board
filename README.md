# Project management board (book demo #265)

Roy Derks — *React Projects*, 2nd Edition, Chapter 3.

| Artifact | Path |
|----------|------|
| Verbatim chapter text from PDF | [`BOOK_CHAPTER3_EXTRACT.md`](./BOOK_CHAPTER3_EXTRACT.md) |
| Step order (matches book sections) | [`BOOK_DIRECTIONS.md`](./BOOK_DIRECTIONS.md) |
| Runnable web app | [`web/`](./web/) — `npm install` && `npm run dev` |
| Portfolio wiring (after MyWebsite on D:) | [`PORTFOLIO_INTEGRATION.md`](./PORTFOLIO_INTEGRATION.md) |
| Packt reference code | [`../../_book-ref/React-Projects-Second-Edition/Chapter03`](../../_book-ref/React-Projects-Second-Edition/Chapter03) |

**Note:** The book loads tasks from My JSON Server; this demo uses `web/public/tasks.json` (same task fields: `id`, `title`, `body`, `lane`). Set `TASKS_DATA_SOURCE` in `web/src/config/tasksApi.ts` back to the book URL if you want the live mock API.

Requires **Node.js ≥ 18.17** for Next.js 14 (your portfolio stack).
