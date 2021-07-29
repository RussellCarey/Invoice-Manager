import React, { useContext } from "react";
import styled from "styled-components";
import Image from "next/image";
import { MyTheme } from "../styles/theme/theme";

import Button from "./Button";
import downArrowImage from "../public/assets/icon-arrow-down.svg";

import UIContext from "../context/ui/UIContext";

const Container = styled.header`
  width: 100%;
  height: min-content;
  display: flex;
  justify-content: space-between;

  margin-bottom: ${MyTheme.space.xlarge};
`;

const TextArea = styled.div`
  width: max-content;
  height: 100%;

  color: ${MyTheme.colors.text.white};
`;

const Title = styled.h3`
  font-size: ${MyTheme.fontSizes.h3};
  margin-bottom: ${MyTheme.space.medium};
`;
const Caption = styled.p`
  font-size: ${MyTheme.fontSizes.caption};
`;

const FilterandButton = styled.div`
  display: flex;
  align-items: center;

  width: min-content;
  height: 100%;
`;

const DropDown = styled.span`
  width: max-content;
  font-size: ${MyTheme.fontSizes.caption};
  color: white;
  white-space: nowrap;
  margin-right: ${MyTheme.space.medium};
`;

const ArrowImage = styled(Image)`
  margin-right: ${MyTheme.space.large};
`;

const ButtonClickDiv = styled.div``;

export default function InvoiceHead(rops) {
  const uiContext = useContext(UIContext);
  const { showNewInvoiceWindow } = uiContext;

  const clickHandler = () => {
    showNewInvoiceWindow();
  };

  return (
    <Container>
      <TextArea>
        <Title>Invoice</Title>
        <Caption>There are a total of 4 invoices.</Caption>
      </TextArea>
      <FilterandButton>
        <DropDown>Filter Search</DropDown>
        <ArrowImage src={downArrowImage.src} width={10} height={10} />
        <ButtonClickDiv onClick={() => clickHandler()}>
          <Button
            bgColor={MyTheme.colors.ui.btnPurple}
            isPlus={true}
            text={"New Invoice"}
          />
        </ButtonClickDiv>
      </FilterandButton>
    </Container>
  );
}
