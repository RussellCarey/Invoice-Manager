import React, { useContext, useEffect, Fragment } from "react";
import { useRouter } from "next/router";
import { MyTheme } from "../../styles/theme/theme";
import styled from "styled-components";
import axios from "axios";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${MyTheme.colors.bg.primary};
`;

export default function PaymentPage({ id }) {
  const router = useRouter();

  const getPaymentData = async () => {
    try {
      const req = await axios.get(
        `http://localhost:2222/api/data/invoice/payment/${id}`
      );
      const data = req.data.data;
      router.push(data.url);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPaymentData();
  });

  return <Container></Container>;
}

export async function getServerSideProps({ query: { id } }) {
  return {
    props: {
      id: id,
    },
  };
}
