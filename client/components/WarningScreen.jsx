import React, { useContext } from "react";
import styled from "styled-components";
import Image from "next/image";
import { MyTheme } from "../styles/theme/theme";

import Button from "./Button";

import UIContext from "../context/ui/UIContext";

const Container = styled.div`
  z-index: 1000000;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #0000008d;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const MessageDiv = styled.div`
  width: 40vw;
  height: min-content;
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: ${MyTheme.space.large};
  background-color: ${MyTheme.colors.bg.primary};
  border-radius: 10px;
  color: ${MyTheme.colors.text.white};

  @media (max-width: 1000px) {
    width: 60vw;
  }

  @media (max-width: 900px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
`;

const ButtonDiv = styled.div`
  width: 60%;
  padding: ${MyTheme.space.medium};
  display: flex;
  justify-content: space-around;

  @media (max-width: 900px) {
    width: 100%;
    height: 150px;
    flex-direction: column;
    align-items: center;
  }
`;

const ButtonDivClick = styled.div``;

const TextDiv = styled.div`
  width: 100%;
  height: min-content;
`;

const Title = styled.h3`
  font-size: ${MyTheme.fontSizes.h3};
  margin-bottom: ${MyTheme.space.large};
`;

const Text = styled.p`
  font-size: ${MyTheme.fontSizes.body};
`;

export default function WarningScreen({ title, text, funcToRun }) {
  const uiContext = useContext(UIContext);
  const { hideConfirmModal } = uiContext;

  return (
    <Container>
      <MessageDiv>
        <TextDiv>
          <Title>{title}</Title>
          <Text>{text}</Text>
        </TextDiv>
        <ButtonDiv>
          <ButtonDivClick onClick={hideConfirmModal}>
            <Button text={"Cancel"} bgColor={MyTheme.colors.ui.btnPurple} />
          </ButtonDivClick>
          <ButtonDivClick onClick={funcToRun}>
            <Button text={"Confirm"} bgColor={MyTheme.colors.ui.btnRed} />
          </ButtonDivClick>
        </ButtonDiv>
      </MessageDiv>
    </Container>
  );
}
