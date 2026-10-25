"use client";

import Task from "../Task/Task";
import styled from "styled-components";
import type { BoardTask } from "@/config/tasksApi";

const LaneWrapper = styled.div`
  text-align: left;
  padding: 0;
  background: lightGray;
  border-radius: 20px;
  min-height: 50vh;
  width: 20vw;

  @media (max-width: 768px) {
    margin-bottom: 5%;
  }
`;

const Title = styled.h2`
  width: 100%;
  padding-bottom: 10px;
  text-align: center;
  border-bottom: 1px solid darkGray;
`;

type LaneProps = {
  laneId: number;
  title: string;
  loading: boolean;
  error: string;
  tasks: BoardTask[];
  onDragStart: (e: React.DragEvent, id: number) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, laneId: number) => void;
};

/** One swim lane: drop target + list of tasks whose `lane` matches `laneId`. */
function Lane({
  laneId,
  title,
  loading,
  error,
  tasks,
  onDragStart,
  onDragOver,
  onDrop,
}: LaneProps) {
  return (
    <LaneWrapper onDragOver={onDragOver} onDrop={(e) => onDrop(e, laneId)}>
      <Title>{title}</Title>
      {loading || error ? (
        <span>{error || "Loading..."}</span>
      ) : (
        tasks.map((task) => (
          <Task
            key={task.id}
            id={task.id}
            title={task.title}
            body={task.body}
            onDragStart={onDragStart}
          />
        ))
      )}
    </LaneWrapper>
  );
}

export default Lane;
