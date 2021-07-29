import React, { useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import { MyTheme } from "../../styles/theme/theme";

import Layout from "../../components/Layout";
import GoBackBar from "../../components/GoBackBar";
import InvoiceBar from "../../components/InvoiceBar";
import InvoiceInfo from "../../components/InvoiceInfo";

import EditWindow from "../../components/EditWindow";

const Container = styled.div``;

export default function SingleInvoice({ id }) {
  const [showNew, setShowNew] = useState(false);

  return (
    <Layout>
      {showNew && <EditWindow />}
      <Container>
        <GoBackBar />
        <InvoiceBar setShowNew={setShowNew} showNew={showNew} />
        <InvoiceInfo />
      </Container>
    </Layout>
  );
}

export async function getServerSideProps({ query: { id } }) {
  //   const res = await fetch(`${API_URL}/events?slug=${id}`);
  //   const evt = await res.json();

  return {
    props: {
      id: id,
    },
  };
}
