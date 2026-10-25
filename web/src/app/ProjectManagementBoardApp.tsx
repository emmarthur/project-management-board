"use client";

import styled from "styled-components";
import Board from "@/pages/Board/Board";
import Header from "@/components/Header/Header";
import Backlog from "@/pages/Backlog/Backlog";
import Help from "@/components/Help/Help";

const AppWrapper = styled.div`
  position: relative;
  text-align: center;
  overflow-x: hidden;
`;

const Blob = styled.div`
  pointer-events: none;
  position: fixed;
  border-radius: 9999px;
  filter: blur(80px);
  opacity: 0.35;
  z-index: 0;
`;

const BlobA = styled(Blob)`
  width: 22rem;
  height: 22rem;
  top: -4rem;
  right: -4rem;
  background: #6366f1;
`;

const BlobB = styled(Blob)`
  width: 18rem;
  height: 18rem;
  bottom: -3rem;
  left: -3rem;
  background: #818cf8;
`;

const Content = styled.div`
  position: relative;
  z-index: 1;
`;

export default function ProjectManagementBoardApp() {
  return (
    <AppWrapper>
      <BlobA aria-hidden="true" />
      <BlobB aria-hidden="true" />
      <Content>
        <Header />
        <Board />
        <Backlog />
        <Help />
      </Content>
    </AppWrapper>
  );
}
