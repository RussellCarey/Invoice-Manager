import styled from "styled-components";
import Image from "next/image";
import { MyTheme } from "../styles/theme/theme";
import Link from "next/link";
import Layout from "./Layout";

import leftArrowImage from "../public/assets/icon-arrow-left.svg";

const Container = styled.div`
  width: 100%;
  height: min-content;

  padding: ${MyTheme.space.medium};
`;

const Text = styled.span`
  color: ${MyTheme.colors.ui.line};
  font-size: ${MyTheme.fontSizes.caption};
  margin-left: ${MyTheme.space.medium};

  transition: all 0.4s;

  &:hover {
    cursor: pointer;
    color: ${MyTheme.colors.ui.btnPurpleHover};
    margin-left: ${MyTheme.space.medium};
  }
`;

export default function GoBackBar({ id }) {
  return (
    <Container>
      <Image src={leftArrowImage.src} height={10} width={10} />
      <Link href="/">
        <Text>Go Back</Text>
      </Link>
    </Container>
  );
}
