# Chapter 3 directions (Roy Derks — *React Projects*, 2nd Edition)

**Catalog #265:** Building a dynamic project management board

The **verbatim PDF text** for this chapter is in [`BOOK_CHAPTER3_EXTRACT.md`](./BOOK_CHAPTER3_EXTRACT.md) (Packt PDF pages at indices 86–117). Below is the same chapter structure and step order as the book, without paraphrasing the procedural steps.

## Chapter overview (from the book)

- **Topics:** Handling the data flow; custom Hooks; HTML5 Drag and Drop API; styling with styled-components.
- **Stack in the book:** Create React App, styled-components, mock REST API via [My JSON Server](https://my-json-server.typicode.com/) on the repo `db.json`.
- **Build time (book):** 1.5–2 hours.
- **Getting started (book):**
  - Initial app: https://github.com/PacktPublishing/React-Projects-Second-Edition/tree/main/Chapter03-initial
  - Finished app: https://github.com/PacktPublishing/React-Projects-Second-Edition/tree/main/Chapter03
  - `npm install`, then `npm start`, open http://localhost:3000

## Section order (follow in this sequence)

### 1. Creating a project management board application

#### Handling the data flow → Loading and displaying the data

1. Fetch project data in **Board**; use `useState` / `useEffect` and the book’s fetch URL:
   `https://my-json-server.typicode.com/PacktPublishing/React-Projects-Second-Edition/tasks`
2. Pass `loading`, `error`, and filtered `tasks` into **Lane**; map four lanes (To Do, In Progress, Review, Done).
3. Add **Task** component (`title`, `body`); add **Task.css** as specified in the book.
4. Verify tasks render from the mock REST API (book Figure 3.3).

### 2. Working with custom Hooks

#### Creating custom Hooks

1. Create `src/hooks/useDataFetching.js` with `useState` for `loading`, `data`, `error`.
2. Fetch inside `useEffect` from the `dataSource` argument; return `[loading, error, data]`.

#### Reusing a custom Hook

1. Refactor **Board** to use `useDataFetching` instead of inline fetch logic.
2. Create **Backlog** under `pages/Backlog/`; reuse `useDataFetching` with the same tasks URL; render all tasks with **Task**.

### 3. Making the board dynamic

1. Implement HTML5 drag and drop on **Task** / **Lane** / **Board** (`onDragStart`, `onDragOver`, `onDrop`, `dataTransfer`).
2. Update task `lane` in local state when a task is dropped on a lane.

### 4. Styling in React with styled-components

1. Install styled-components (book version 5.3.5 in Chapter03 `package.json`).
2. Move **Lane** and **Task** styling to styled-components; add global styles in **App** with `createGlobalStyle`.
3. **Summary / Further reading** — end of chapter (see extract).

## Web portfolio adaptation (this repo only)

| Book | This demo (`web/`) |
|------|---------------------|
| CRA `chapter-3` | Next.js 14 App Router (client components) |
| My JSON Server URL | Static `/tasks.json` (same task shape as Packt `db.json`) |
| Hosted on portfolio | Route to mount later: `/demos/project-management-board` — see [`PORTFOLIO_INTEGRATION.md`](./PORTFOLIO_INTEGRATION.md) |

Reference implementation cloned from Packt: [`../../_book-ref/React-Projects-Second-Edition/Chapter03`](../../_book-ref/React-Projects-Second-Edition/Chapter03).
