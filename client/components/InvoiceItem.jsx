import styled from "styled-components";
import Image from "next/image";
import { MyTheme } from "../styles/theme/theme";
import Link from "next/link";

import arrowImage from "../public/assets/icon-arrow-right.svg";

const Container = styled.div`
  width: 100%;
  height: min-content;
  border-radius: 10px;
  background-color: ${MyTheme.colors.bg.secondary};

  padding: ${MyTheme.space.medium} ${MyTheme.space.large};

  display: grid;
  grid-template-columns: 1fr 1fr 2fr 1fr 1fr;
  align-items: center;

  margin-bottom: ${MyTheme.space.medium};

  transition: all 0.2s ease-in-out;

  &:hover {
    cursor: pointer;
    border: 1px solid ${MyTheme.colors.ui.btnPurple};
  }

  @media (max-width: 600px) {
    padding: ${MyTheme.space.medium} ${MyTheme.space.large};
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 2fr 1fr 2fr;
  }
`;

const Id = styled.p`
  color: ${MyTheme.colors.text.white};
  font-size: ${MyTheme.fontSizes.caption};
  grid-column: 1/2;
  grid-row: 1/2;

  @media (max-width: 600px) {
    grid-column: 1/2;
    grid-row: 1/2;
  }
`;

const Name = styled.p`
  color: ${MyTheme.colors.text.white};
  font-size: ${MyTheme.fontSizes.caption};
  grid-column: 2/3;
  grid-row: 1/2;

  @media (max-width: 600px) {
    grid-column: 2/3;
    grid-row: 1/2;
    justify-self: end;
  }
`;

const Date = styled.p`
  color: ${MyTheme.colors.text.whitePurple};
  font-size: ${MyTheme.fontSizes.caption};
  grid-column: 3/4;
  grid-row: 1/2;

  @media (max-width: 600px) {
    grid-column: 1/2;
    grid-row: 2/3;
  }
`;

const Cost = styled.p`
  color: ${MyTheme.colors.text.white};
  font-size: ${MyTheme.fontSizes.body};

  @media (max-width: 600px) {
    grid-column: 1/2;
    grid-row: 3/4;
  }
`;

const Notification = styled.div`
  background-color: ${(props) =>
    props.status === "paid"
      ? MyTheme.colors.notifications.green
      : props.status === "pending"
      ? MyTheme.colors.notifications.orange
      : MyTheme.colors.notifications.white};
  color: ${(props) =>
    props.status === "paid"
      ? MyTheme.colors.text.green
      : props.status === "pending"
      ? MyTheme.colors.text.orange
      : MyTheme.colors.text.white};

  grid-column: 5/6;
  grid-row: 1/2;
  width: 120px;
  height: min-content;
  border-radius: 10px;
  padding: ${MyTheme.space.medium} ${MyTheme.space.large};

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: ${MyTheme.fontSizes.caption};

  @media (max-width: 600px) {
    grid-column: 2/3;
    grid-row: 2/4;
    justify-self: end;
  }
`;

const Arrow = styled(Image)``;

export default function InvoiceItem({ object }) {
  return (
    <Link href={`/invoice/${object.invoiceId}`}>
      <Container>
        <Id>#{object.invoiceId}</Id>
        <Name>{object.clientName}</Name>
        <Date>Oct 20 2021</Date>
        <Cost>${object.total}</Cost>
        <Notification status={object.status}>{object.status}</Notification>
        {/* <Arrow src={arrowImage.src} width={15} height={15} alt='right arrow'/> */}
      </Container>
    </Link>
  );
}
