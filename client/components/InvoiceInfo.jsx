import React, { useContext } from "react";
import styled from "styled-components";
import Image from "next/image";
import { MyTheme } from "../styles/theme/theme";

import InvoiceContext from "../context/invoices/InvoiceContext";

const Container = styled.div`
  width: 100%;
  padding: ${MyTheme.space.large};

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

  margin-bottom: ${MyTheme.space.large};
`;

const BottomSection = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${MyTheme.colors.bg.light};
  border-radius: 10px 10px 0 0;
`;

const BottomSectionRowContainer = styled.div`
  width: 100%;
  padding: ${MyTheme.space.large};
  padding-bottom: ${MyTheme.space.medium};
  display: grid;
  grid-template-columns: 3fr 1fr 2fr 2fr;
  margin-bottom: ${MyTheme.space.small};
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

export default function InvoiceInfo({ invoice }) {
  const invoiceContext = useContext(InvoiceContext);
  const { invoiceState } = invoiceContext;

  return (
    <Container>
      <TopSection>
        <SectionDiv row={"1/2"} col={"1/2"}>
          <Text>#{invoiceState.currentInvoice.invoiceId}</Text>
          <SmallText>
            {invoiceState.currentInvoice.projectDescription}
          </SmallText>
        </SectionDiv>

        <SectionDiv row={"1/2"} col={"4/5"} align={"right"}>
          <SmallText>{invoiceState.currentInvoice.billerStreet}</SmallText>
          <SmallText>{invoiceState.currentInvoice.billerCity}</SmallText>
          <SmallText>{invoiceState.currentInvoice.billerCountry}</SmallText>
          <SmallText>{invoiceState.currentInvoice.billerPostCode}</SmallText>
        </SectionDiv>

        <SectionDiv row={"2/3"} col={"1/2"}>
          <SmallText>Invoice Date</SmallText>
          <Text>{invoiceState.currentInvoice.clientIssueDate}</Text>
        </SectionDiv>

        <SectionDiv row={"3/4"} col={"1/2"}>
          <SmallText>Payment Due</SmallText>
          <Text>{invoiceState.currentInvoice.clientPaymentTerms}</Text>
        </SectionDiv>

        <SectionDiv row={"2/4"} col={"2/3"}>
          <SmallText>Bill To</SmallText>
          <Text>{invoiceState.currentInvoice.clientStreetAddress}</Text>
          <SmallText>{invoiceState.currentInvoice.clientCity}</SmallText>
          <SmallText>{invoiceState.currentInvoice.clientCountry}</SmallText>
          <SmallText>{invoiceState.currentInvoice.clientPostCode}</SmallText>
        </SectionDiv>

        <SectionDiv row={"2/3"} col={"3/5"}>
          <SmallText>Sent To</SmallText>
          <Text>{invoiceState.currentInvoice.clientEmail}</Text>
        </SectionDiv>
      </TopSection>

      <BottomSection>
        <BottomSectionRowContainer>
          <SmallText>Item Name</SmallText>
          <SmallText>QTY.</SmallText>
          <SmallText style={{ justifySelf: "flex-end" }}>Price</SmallText>
          <SmallText style={{ justifySelf: "flex-end" }}>Total</SmallText>
        </BottomSectionRowContainer>

        {invoiceState.currentInvoice.items.length > 0
          ? invoiceState.currentInvoice.items.map((item) => {
              return (
                <BottomSectionRowContainer key={Math.random() * 1000}>
                  <SmallText>{item.name}</SmallText>
                  <SmallText>{item.qty}</SmallText>
                  <SmallText style={{ justifySelf: "flex-end" }}>
                    {item.price}
                  </SmallText>
                  <SmallText style={{ justifySelf: "flex-end" }}>
                    {item.total}
                  </SmallText>
                </BottomSectionRowContainer>
              );
            })
          : null}

        <TotalArea>
          <SmallText>Amount Due</SmallText>
          <LargeText>{invoiceState.currentInvoice.total}</LargeText>
        </TotalArea>
      </BottomSection>
    </Container>
  );
}
