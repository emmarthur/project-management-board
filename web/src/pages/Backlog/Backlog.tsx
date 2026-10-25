"use client";

import Task from "@/components/Task/Task";
import useDataFetching from "@/hooks/useDataFetching";
import { TASKS_DATA_SOURCE, type BoardTask } from "@/config/tasksApi";
import "./Backlog.css";

/** Book backlog page: same fetch hook as the board, lists every task without lanes. */
function Backlog() {
  const [loading, error, tasks] = useDataFetching<BoardTask>(TASKS_DATA_SOURCE);

  return (
    <div className="Backlog-wrapper">
      <h2>Backlog</h2>
      <div className="Tasks-wrapper">
        {loading || error ? (
          <span>{error || "Loading..."}</span>
        ) : (
          tasks.map((task) => (
            <Task key={task.id} title={task.title} body={task.body} />
          ))
        )}
      </div>
    </div>
  );
}

export default Backlog;
