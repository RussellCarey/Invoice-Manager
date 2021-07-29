import styled from "styled-components";
import Image from "next/image";
import { MyTheme } from "../styles/theme/theme";

const Container = styled.div`
  width: 100%;
  padding: ${MyTheme.space.xlarge};

  border-radius: 10px;

  display: flex;
  flex-direction: column;

  background-color: ${MyTheme.colors.bg.secondary};
`;

const TopSection = styled.div`
  width: 100%;

  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-gap: ${MyTheme.space.large};

  line-height: ${MyTheme.lineHeights.small};
`;

const BottomSection = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr 2fr 2fr;
  padding: ${MyTheme.space.large};
  background-color: ${MyTheme.colors.bg.light};
  border-radius: 10px 10px 0 0;
`;

const BottomSectionColumn = styled.div`
  display: grid;
  grid-template-rows: repeat(1fr);
  grid-row-gap: ${MyTheme.space.large};
`;

const TotalArea = styled.div`
  width: 100%;
  padding: ${MyTheme.space.large};

  display: flex;
  align-items: center;
  justify-content: space-between;

  background-color: ${MyTheme.colors.bg.dark};
  border-radius: 0 0 10px 10px;
`;

const SmallText = styled.p`
  color: ${MyTheme.colors.text.whitePurple};
  font-size: ${MyTheme.fontSizes.caption};
`;

const Text = styled.p`
  color: ${MyTheme.colors.text.white};
  font-size: ${MyTheme.fontSizes.body};
`;

const LargeText = styled.p`
  color: ${MyTheme.colors.text.white};
  font-size: ${MyTheme.fontSizes.title};
`;

const SectionDiv = styled.div`
  grid-row: ${(props) => props.row};
  grid-column: ${(props) => props.col};
  text-align: ${(props) => props.align || null};
`;

export default function InvoiceInfo() {
  return (
    <Container>
      <TopSection>
        <SectionDiv row={"1/2"} col={"1/2"}>
          <Text>#XM9141</Text>
          <SmallText>Graphic Design</SmallText>
        </SectionDiv>

        <SectionDiv row={"1/2"} col={"4/5"} align={"right"}>
          <SmallText>25 Chcihester Road</SmallText>
          <SmallText>Bognor Regis</SmallText>
          <SmallText>West Sussex</SmallText>
          <SmallText>PO21 2XQ</SmallText>
        </SectionDiv>

        <SectionDiv row={"2/3"} col={"1/2"}>
          <SmallText>Invoice Date</SmallText>
          <Text>20 Sep 2022</Text>
        </SectionDiv>

        <SectionDiv row={"3/4"} col={"1/2"}>
          <SmallText>Payment Due</SmallText>
          <Text>25 Sep 2022</Text>
        </SectionDiv>

        <SectionDiv row={"2/4"} col={"2/3"}>
          <SmallText>Bill To</SmallText>
          <Text>Russell Carey</Text>
          <SmallText>Bognor Regis</SmallText>
          <SmallText>West Sussex</SmallText>
          <SmallText>PO21 2XQ</SmallText>
        </SectionDiv>

        <SectionDiv row={"2/3"} col={"3/5"}>
          <SmallText>Sent To</SmallText>
          <Text>rusell_carey@hotmail.co.uk</Text>
        </SectionDiv>
      </TopSection>

      <BottomSection>
        <SectionDiv row={"1/2"} col={"1/2"}>
          <BottomSectionColumn>
            <SmallText>Item Name</SmallText>
            <Text>Wedsite Design</Text>
            <Text>Website Development</Text>
          </BottomSectionColumn>
        </SectionDiv>

        <SectionDiv row={"1/2"} col={"2/3"}>
          <BottomSectionColumn>
            <SmallText>QTY.</SmallText>
            <Text>1</Text>
            <Text>2</Text>
          </BottomSectionColumn>
        </SectionDiv>

        <SectionDiv row={"1/2"} col={"3/4"} align={"right"}>
          <BottomSectionColumn>
            <SmallText>Price</SmallText>
            <Text>$500</Text>
            <Text>$1500</Text>
          </BottomSectionColumn>
        </SectionDiv>

        <SectionDiv row={"1/2"} col={"4/5"} align={"right"}>
          <BottomSectionColumn>
            <SmallText>Total</SmallText>
            <Text>$500</Text>
            <Text>$3000</Text>
          </BottomSectionColumn>
        </SectionDiv>
      </BottomSection>

      <TotalArea>
        <SmallText>Amount Due</SmallText>
        <LargeText>$3500</LargeText>
      </TotalArea>
    </Container>
  );
}
