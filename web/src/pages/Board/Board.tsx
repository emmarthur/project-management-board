"use client";

import { useEffect, useState } from "react";
import useDataFetching from "@/hooks/useDataFetching";
import Lane from "@/components/Lane/Lane";
import { TASKS_DATA_SOURCE, type BoardTask } from "@/config/tasksApi";
import "./Board.css";

/** Kanban columns; `laneId` must match each task's `lane` field from the API. */
const lanes = [
  { id: 1, title: "To Do" },
  { id: 2, title: "In Progress" },
  { id: 3, title: "Review" },
  { id: 4, title: "Done" },
];

/** HTML5 DnD: stash task id on the drag event (book uses the same pattern). */
function onDragStart(e: React.DragEvent, id: number) {
  e.dataTransfer.setData("id", id.toString());
}

/** Required so the lane can receive a drop (default is to reject). */
function onDragOver(e: React.DragEvent) {
  e.preventDefault();
}

function Board() {
  const [loading, error, data] = useDataFetching<BoardTask>(TASKS_DATA_SOURCE);
  const [tasks, setTasks] = useState<BoardTask[]>([]);

  // Local copy so drag-and-drop can update lane without refetching.
  useEffect(() => {
    setTasks(data);
  }, [data]);

  /** Move the dropped task into the target lane (client-side only; book does not persist). */
  function onDrop(e: React.DragEvent, laneId: number) {
    const id = e.dataTransfer.getData("id");

    const updatedTasks = tasks.filter((task) => {
      if (task.id.toString() === id) {
        task.lane = laneId;
      }
      return task;
    });

    setTasks(updatedTasks);
  }

  return (
    <div className="Board-wrapper">
      {lanes.map((lane) => (
        <Lane
          key={lane.id}
          laneId={lane.id}
          title={lane.title}
          loading={loading}
          error={error}
          tasks={tasks.filter((task) => task.lane === lane.id)}
          onDragStart={onDragStart}
          onDragOver={onDragOver}
          onDrop={onDrop}
        />
      ))}
    </div>
  );
}

export default Board;
