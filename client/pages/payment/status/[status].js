import React, { useContext, useEffect, Fragment } from "react";
import { MyTheme } from "../../../styles/theme/theme";
import styled from "styled-components";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${MyTheme.colors.bg.primary};

  display: flex;
  justify-content: center;
  align-items: center;
`;

const MessageDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  width: 40vw;
  height: min-content;
  padding: ${MyTheme.space.large};
  border-radius: 15px;
  line-height: ${MyTheme.lineHeights.body};

  background-color: ${MyTheme.colors.bg.secondary};
  color: ${MyTheme.colors.text.white};
  font-size: ${MyTheme.fontSizes.body};
`;

export default function PaymentPage({ status }) {
  return (
    <Container>
      <MessageDiv>
        {status === "success"
          ? "Thank you for your payment, we are currently processing this payment and you will recieve a confirmation email when your payment has been processed."
          : "Our apologies, your payment seems to have failed. Please try again and if the problem persists please contact the biller."}
      </MessageDiv>
    </Container>
  );
}

export async function getServerSideProps({ query: { status } }) {
  return {
    props: {
      status: status,
    },
  };
}
