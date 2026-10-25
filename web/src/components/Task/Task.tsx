"use client";

import styled from "styled-components";

const TaskWrapper = styled.div`
  background: darkGray;
  padding: 20px;
  border-radius: 20px;
  margin: 0% 5% 5% 5%;
`;

const Title = styled.h3`
  width: 100%;
  margin: 0;
`;

type TaskProps = {
  id?: number;
  title: string;
  body: string;
  onDragStart?: (e: React.DragEvent, id: number) => void;
};

/** Task card; draggable on the board when `id` and `onDragStart` are provided (not on backlog). */
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
