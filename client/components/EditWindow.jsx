import React, { useContext } from "react";
import styled from "styled-components";
import Image from "next/image";
import { MyTheme } from "../styles/theme/theme";

import Button from "./Button";

import UIContext from "../context/ui/UIContext";

const Container = styled.div`
  z-index: 40;
  background-color: #0000008d;
  width: 100vw;
  height: 100%;

  position: absolute;
  top: 0;
  left: 0;
`;

const Window = styled.div`
  z-index: 50;
  width: 40vw;
  height: 100vh;
  padding: ${MyTheme.space.large};

  position: absolute;
  top: 0;
  left: 100px;

  display: flex;
  flex-direction: column;

  background-color: ${MyTheme.colors.bg.primary};

  overflow-y: scroll;

  @media (max-width: 1000px) {
    width: 50vw;
    top: 100px;
    left: 0px;
  }

  @media (max-width: 700px) {
    width: 80vw;
    top: 100px;
    left: 0px;
  }

  @media (max-width: 600px) {
    width: 100vw;
    top: 100px;
    left: 0px;
  }
`;

const TwoLane = styled.div`
  max-width: 100%;
  display: grid;
  grid-column-gap: ${MyTheme.space.medium};
  grid-template-columns: repeat(2, minmax(0, 1fr));
  margin-bottom: ${(props) => props.mb || null};
`;

const ThreeLane = styled.div`
  max-width: 100%;
  display: grid;
  grid-column-gap: ${MyTheme.space.medium};
  grid-template-columns: repeat(3, minmax(0, 1fr));
  margin-bottom: ${(props) => props.mb || null};
`;

const FiveLane = styled.div`
  max-width: 100%;
  display: grid;

  grid-column-gap: ${MyTheme.space.medium};
  grid-template-columns:
    minmax(0, 4fr)
    minmax(0, 1fr)
    minmax(0, 2fr)
    minmax(0, 2fr)
    minmax(0, 1fr);
  margin-bottom: ${(props) => props.mb || null};
`;

const Input = styled.input`
  border: solid 1px ${MyTheme.colors.ui.border};
  outline: 0;
  color: ${MyTheme.colors.text.white};
  font-size: ${MyTheme.fontSizes.caption};
  padding: ${MyTheme.space.medium} ${MyTheme.space.medium};
  border-radius: 5px;

  background-color: ${MyTheme.colors.bg.sideBar};

  grid-row: ${(props) => props.row || null};
  grid-column: ${(props) => props.col || null};
  margin-bottom: ${(props) => props.mb || null};
`;

const Title = styled.p`
  color: ${MyTheme.colors.text.purple};
  font-size: ${MyTheme.fontSizes.caption};
  margin-bottom: ${MyTheme.space.medium};
`;

const GreyTitle = styled.p`
  color: ${MyTheme.colors.text.purple};
  font-size: ${MyTheme.fontSizes.body};
  margin-bottom: ${(props) => props.mb || null};
`;

const Label = styled.label`
  color: ${MyTheme.colors.text.white};
  font-size: ${MyTheme.fontSizes.caption};
  margin-bottom: ${MyTheme.space.small};

  grid-row: ${(props) => props.row || null};
  grid-column: ${(props) => props.col || null};
`;

const Text = styled.p`
  color: ${MyTheme.colors.text.white};
  font-size: ${MyTheme.fontSizes.caption};
  align-self: center;

  grid-row: ${(props) => props.row || null};
  grid-column: ${(props) => props.col || null};
`;

const NewItemButton = styled.button`
  border: 0;
  outline: 0;
  border-radius: 20px;
  font-size: ${MyTheme.fontSizes.body};
  color: ${MyTheme.colors.white};
  width: 100%;
  padding: ${MyTheme.space.medium} ${MyTheme.space.small};
  background-color: ${MyTheme.colors.bg.sideBar};
  margin-bottom: ${(props) => props.mb || null};
`;

const ButtonDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  & > * {
    margin-bottom: ${MyTheme.space.medium};
  }

  @media (max-width: 600px) {
    position: fixed;
    bottom: 0;
    left: 0;

    height: min-content;
    padding: ${MyTheme.space.medium} 0;
    flex-wrap: wrap;
    align-items: center;
    background-color: ${MyTheme.colors.bg.sideBar};
  }
`;

const ButtonClickDiv = styled.div``;

export default function EditWindow() {
  const uiContext = useContext(UIContext);
  const { showNewInvoiceWindow } = uiContext;

  const closeNewWindow = () => {
    showNewInvoiceWindow();
  };

  return (
    <Container>
      <Window>
        <Title>Bill Form</Title>
        <Label>Street Address</Label>
        <Input mb={MyTheme.space.medium} />

        <ThreeLane mb={MyTheme.space.large}>
          <Label col={"1/2"} row={"1/2"}>
            City
          </Label>
          <Input col={"1/2"} row={"2/3"} />
          <Label col={"2/3"} row={"1/2"}>
            Post Code
          </Label>
          <Input col={"2/3"} row={"2/3"} />
          <Label col={"3/4"} row={"1/2"}>
            Country
          </Label>
          <Input col={"3/4"} row={"2/3"} />
        </ThreeLane>

        <Title>Bill To</Title>
        <Label>Clients Name</Label>
        <Input mb={MyTheme.space.medium} />
        <Label>Clients Email</Label>
        <Input mb={MyTheme.space.medium} />
        <Label>Street Address</Label>
        <Input mb={MyTheme.space.medium} />

        <ThreeLane mb={MyTheme.space.large}>
          <Label col={"1/2"} row={"1/2"}>
            City
          </Label>
          <Input col={"1/2"} row={"2/3"} />
          <Label col={"2/3"} row={"1/2"}>
            Post Code
          </Label>
          <Input col={"2/3"} row={"2/3"} />
          <Label col={"3/4"} row={"1/2"}>
            Country
          </Label>
          <Input col={"3/4"} row={"2/3"} />
        </ThreeLane>

        <TwoLane mb={MyTheme.space.medium}>
          <Label col={"1/2"} row={"1/2"}>
            Issue Date
          </Label>
          <Input col={"1/2"} row={"2/3"} />
          <Label col={"2/3"} row={"1/2"}>
            Payment Terms
          </Label>
          <Input col={"2/3"} row={"2/3"} />
        </TwoLane>

        <Label>Project Description</Label>
        <Input mb={MyTheme.space.large} />

        <GreyTitle mb={MyTheme.space.medium}>Items</GreyTitle>

        <FiveLane mb={MyTheme.space.medium}>
          <Label col={"1/2"} row={"1/2"}>
            Item Name
          </Label>
          <Input col={"1/2"} row={"2/3"} />
          <Input col={"1/2"} row={"3/4"} />

          <Label col={"2/3"} row={"1/2"}>
            QTY.
          </Label>
          <Input col={"2/3"} row={"2/3"} />
          <Input col={"2/3"} row={"3/4"} />

          <Label col={"3/4"} row={"1/2"}>
            Price
          </Label>
          <Input col={"3/4"} row={"2/3"} />
          <Input col={"3/4"} row={"3/4"} />

          <Label col={"4/5"} row={"1/2"}>
            Total
          </Label>
          <Text col={"4/5"} row={"2/3"}>
            $500
          </Text>
          <Text col={"4/5"} row={"3/4"}>
            $500
          </Text>

          <Text col={"5/6"} row={"2/3"}>
            DEL
          </Text>
          <Text col={"5/6"} row={"3/4"}>
            DEL
          </Text>
        </FiveLane>

        <NewItemButton mb={MyTheme.space.large}>+ Add New Item</NewItemButton>

        <ButtonDiv>
          <ButtonClickDiv onClick={() => closeNewWindow()}>
            <Button
              onClick={() => closeNewWindow()}
              bgColor={MyTheme.colors.bg.white}
              textColor={MyTheme.colors.text.lightPurple}
              text={"Discard"}
            />
          </ButtonClickDiv>

          <ButtonClickDiv>
            <Button
              bgColor={MyTheme.colors.bg.light}
              textColor={MyTheme.colors.text.white}
              text={"Save as Draft"}
            />
          </ButtonClickDiv>

          <ButtonClickDiv>
            <Button
              bgColor={MyTheme.colors.ui.btnPurple}
              textColor={MyTheme.colors.text.white}
              text={"Save"}
            />
          </ButtonClickDiv>
        </ButtonDiv>
      </Window>
    </Container>
  );
}
