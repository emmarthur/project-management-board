/**
 * Task JSON source. The book uses My JSON Server; this demo serves the same
 * shape from `public/tasks.json` so the app runs offline.
 */
/** Book URL: https://my-json-server.typicode.com/PacktPublishing/React-Projects-Second-Edition/tasks */
export const TASKS_DATA_SOURCE = "/tasks.json";

/** One card on the board; `lane` is 1–4 matching To Do / In Progress / Review / Done. */
export type BoardTask = {
  id: number;
  title: string;
  body: string;
  lane: number;
};
