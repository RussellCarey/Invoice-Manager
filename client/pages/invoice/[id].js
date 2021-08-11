import React, { useContext, useEffect, Fragment } from "react";
import { MyTheme } from "../../styles/theme/theme";
import styled from "styled-components";
import axios from "axios";

import Layout from "../../components/Layout";
import GoBackBar from "../../components/GoBackBar";
import InvoiceBar from "../../components/InvoiceBar";
import InvoiceInfo from "../../components/InvoiceInfo";

import InvoiceWindow from "../../components/InvoiceWindow";

import UIContext from "../../context/ui/UIContext";
import InvoiceContext from "../../context/invoices/InvoiceContext";

const Container = styled.div``;

export default function SingleInvoice({ id }) {
  const uiContext = useContext(UIContext);
  const { state } = uiContext;
  const invoiceContext = useContext(InvoiceContext);
  const { setCurrentInvoice, invoiceState } = invoiceContext;

  const getInvoiceData = async () => {
    const req = await axios.get(`http://localhost:2222/api/data/invoice/${id}`);
    const data = req.data.data;
    console.log(data);
    setCurrentInvoice(data);
  };

  useEffect(() => {
    getInvoiceData();
  }, []);

  return (
    <Fragment>
      {state.showWindow && <InvoiceWindow isNewWindow={false} />}
      <Layout>
        <Container>
          <GoBackBar />
          <InvoiceBar id={id} />
          {invoiceState.currentInvoice && <InvoiceInfo />}
        </Container>
      </Layout>
    </Fragment>
  );
}

export async function getServerSideProps({ query: { id } }) {
  return {
    props: {
      id: id,
    },
  };
}
