import React, { useContext, useEffect, Fragment } from "react";

import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import styled from "styled-components";

import Layout from "../components/Layout";
import InvoiceHead from "../components/InvoiceHead";
import InvoiceItem from "../components/InvoiceItem";

import InvoiceWindow from "../components/InvoiceWindow";

import UIContext from "../context/ui/UIContext";
import InvoiceContext from "../context/invoices/InvoiceContext";

const InvoiceContainer = styled.div`
  width: 100%;
  height: min-content;

  display: flex;
  flex-direction: column;
`;

export default function Home() {
  console.log("refershed");
  const uiContext = useContext(UIContext);
  const { state } = uiContext;
  const invoiceContext = useContext(InvoiceContext);
  const { invoiceState, getAllInvoices, setCurrentInvoice } = invoiceContext;

  const getInvoices = async () => {
    const invoices = await getAllInvoices();
    return invoices;
  };

  useEffect(() => {
    setCurrentInvoice(null);
    getInvoices();
  }, []);

  return (
    <Fragment>
      {state.showWindow ? <InvoiceWindow isNewWindow={true} /> : null}
      <Layout>
        <InvoiceHead />
        <InvoiceContainer>
          {invoiceState.allInvoices && invoiceState.allInvoices.length > 0
            ? invoiceState.allInvoices.map((inv) => {
                return <InvoiceItem key={inv.invoiceId} object={inv} />;
              })
            : null}
        </InvoiceContainer>
      </Layout>
    </Fragment>
  );
}
