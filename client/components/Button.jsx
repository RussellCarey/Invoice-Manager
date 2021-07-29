import styled from "styled-components";
import Image from "next/image";
import { MyTheme } from "../styles/theme/theme";

const Container = styled.button`
  background-color: ${(props) => props.bgColor};
  color: ${(props) => props.textColor || "white"};
  font-size: ${MyTheme.fontSizes.caption};
  padding: ${MyTheme.space.medium} ${MyTheme.space.large};
  border: none;
  outline: none;
  white-space: nowrap;

  width: max-content;
  height: max-content;

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding-right: ${MyTheme.space.large};

  border-radius: 30px;

  &:hover {
    cursor: pointer;
  }
`;

export default function Button({ bgColor, textColor, isPlus, text }) {
  return (
    <Container
      bgColor={bgColor}
      textColor={textColor}
      isPlus={isPlus}
      text={text}
    >
      {text || "Forgot text"}
    </Container>
  );
}
