import styled from "styled-components";
import Image from "next/image";
import { MyTheme } from "../styles/theme/theme";

import Sidebar from "./ Sidebar";

const Container = styled.div`
  position: relative;
  width: 100vw;
  min-height: 100vh;
  height: 100%;
  overflow-y: hidden;
  overflow-x: hidden;

  display: flex;

  @media (max-width: 1000px) {
    flex-direction: column;
  }
`;

const MainArea = styled.main`
  padding: 5% 20%;
  width: 100%;
  min-height: 100vh;
  height: 100%;

  background-color: ${MyTheme.colors.bg.primary};

  display: flex;
  flex-direction: column;

  overflow-y: scroll;

  @media (max-width: 1200px) {
    padding: 2.5% 10%;
  }

  @media (max-width: 600px) {
    padding-top: 60px;
  }
`;

export default function Layout({ children }) {
  return (
    <Container>
      <Sidebar />
      <MainArea>{children}</MainArea>
    </Container>
  );
}
