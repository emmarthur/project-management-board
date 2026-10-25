"use client";

import styled from "styled-components";

const TaskWrapper = styled.div`
  background: rgba(30, 27, 75, 0.85);
  border: 1px solid rgba(129, 140, 248, 0.25);
  padding: 1rem 1.125rem;
  border-radius: 1rem;
  margin: 0 5% 5% 5%;
  color: #f1f5f9;
  cursor: grab;
  transition: transform 0.15s ease, box-shadow 0.15s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(99, 102, 241, 0.25);
  }

  &:active {
    cursor: grabbing;
  }

  p {
    margin: 0.5rem 0 0;
    font-size: 0.875rem;
    line-height: 1.5;
    color: #cbd5e1;
  }
`;

const Title = styled.h3`
  width: 100%;
  margin: 0;
  font-size: 0.9375rem;
  font-weight: 600;
  color: #e0e7ff;
`;

type TaskProps = {
  id?: number;
  title: string;
  body: string;
  onDragStart?: (e: React.DragEvent, id: number) => void;
};

function Task({ id, title, body, onDragStart }: TaskProps) {
  return (
    <TaskWrapper
      draggable={id !== undefined}
      onDragStart={
        id !== undefined && onDragStart
          ? (e) => onDragStart(e, id)
          : undefined
      }
    >
      <Title>{title}</Title>
      <p>{body}</p>
    </TaskWrapper>
  );
}

export default Task;
