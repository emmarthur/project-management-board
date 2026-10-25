"use client";

import Task from "../Task/Task";
import styled from "styled-components";
import type { BoardTask } from "@/config/tasksApi";

const LaneWrapper = styled.div`
  text-align: left;
  padding: 0.75rem 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.07);
  border: 1px solid rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(12px);
  border-radius: 1.25rem;
  min-height: 50vh;
  width: 20vw;
  box-shadow: 0 8px 32px rgba(15, 23, 42, 0.35);

  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 5%;
  }
`;

const Title = styled.h2`
  width: 100%;
  margin: 0 0 0.75rem;
  padding-bottom: 0.75rem;
  font-family: "Outfit", "DM Sans", system-ui, sans-serif;
  font-size: 1rem;
  font-weight: 600;
  text-align: center;
  color: #e2e8f0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const Status = styled.span`
  display: block;
  padding: 1rem;
  text-align: center;
  color: #94a3b8;
  font-size: 0.875rem;
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
        <Status>{error || "Loading..."}</Status>
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
