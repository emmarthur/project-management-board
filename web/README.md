# Run locally

From this folder (`demos/project-management-board/web`):

```powershell
node -v    # should be >= 18.17 (fnm default 20 is fine)
npm install
npm run dev
```

Open **http://localhost:3000** in your browser.

You should see:

- Blue **Project Management Board** header
- Four lanes (**To Do**, **In Progress**, **Review**, **Done**) with tasks from `public/tasks.json`
- Drag a task card into another lane to change its column
- **Backlog** section below listing all tasks (reuses the `useDataFetching` hook, as in the book)

Production build:

```powershell
npm run build
npm start
```

Then open **http://localhost:3000** (same URL; `npm start` serves the built app).

## Book vs this demo

| Book | This app |
|------|----------|
| Create React App on port 3000 | Next.js on port 3000 |
| My JSON Server URL for tasks | `/tasks.json` (offline-friendly) |

To use the book’s live mock API instead, set `TASKS_DATA_SOURCE` in `src/config/tasksApi.ts` to  
`https://my-json-server.typicode.com/PacktPublishing/React-Projects-Second-Edition/tasks`.
