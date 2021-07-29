import React, { useContext } from "react";

import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import styled from "styled-components";

import Layout from "../components/Layout";
import InvoiceHead from "../components/InvoiceHead";
import InvoiceItem from "../components/InvoiceItem";

import EditWindow from "../components/EditWindow";

import UIContext from "../context/ui/UIContext";

const InvoiceContainer = styled.div`
  width: 100%;
  height: min-content;

  display: flex;
  flex-direction: column;
`;

export default function Home() {
  const uiContext = useContext(UIContext);
  const { state } = uiContext;

  return (
    <Layout>
      {state.showNewWindow ? <EditWindow /> : null}
      <InvoiceHead />
      <InvoiceContainer>
        <InvoiceItem />
      </InvoiceContainer>
    </Layout>
  );
}
