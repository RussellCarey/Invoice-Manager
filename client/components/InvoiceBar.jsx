import styled from "styled-components";
import React, { useContext, useState, Fragment } from "react";
import { useRouter } from "next/router";
import Button from "./Button";

import { MyTheme } from "../styles/theme/theme";

import Notification from "./Notification";

import UIContext from "../context/ui/UIContext";
import InvoiceContext from "../context/invoices/InvoiceContext";

import WarningScreen from "./WarningScreen";

const Container = styled.div`
  width: 100%;
  height: min-height;
  background-color: ${MyTheme.colors.bg.secondary};

  display: flex;
  align-items: center;
  justify-content: space-between;

  border-radius: 10px;
  padding: ${MyTheme.space.large};

  margin-bottom: ${MyTheme.space.large};
`;

const Area = styled.div`
  width: 100%;
  display: flex;
  height: 100%;
  width: min-content;

  display: flex;
  align-items: center;
`;

const Text = styled.p`
  font-size: ${MyTheme.fontSizes.caption};
  color: ${MyTheme.colors.text.white};
  margin-right: ${MyTheme.space.large};
`;

const ButtonClickDiv = styled.div``;

export default function InvoiceBar({ id, invoice }) {
  const router = useRouter();

  const [buttonClick, setButtonClick] = useState(null);

  const uiContext = useContext(UIContext);
  const { showInvoiceWindow, state, showConfirmModal } = uiContext;
  const invoiceContext = useContext(InvoiceContext);
  const { deleteInvoice, updateStatus, invoiceState } = invoiceContext;

  const clickHandler = () => {
    showInvoiceWindow();
  };

  const setAsPaid = () => {
    updateStatus(id, "paid");
    showConfirmModal();
    router.reload(window.location.pathname);
  };

  const deleteCurrentInvoice = () => {
    deleteInvoice(id);
    showConfirmModal();
    router.reload(window.location.pathname);
  };

  return (
    <Fragment>
      {buttonClick === "delete" && state.showModal ? (
        <WarningScreen
          title={"Confirm delete."}
          text={"Are you sure you want to delete this invoice?"}
          funcToRun={deleteCurrentInvoice}
        />
      ) : null}
      {buttonClick === "paid" && state.showModal ? (
        <WarningScreen
          title={"Confirm paid."}
          text={"Are you sure you want to set this invoice as paid"}
          funcToRun={setAsPaid}
        />
      ) : null}

      <Container>
        <Area>
          <Text>Status</Text>
          <Notification
            status={
              invoiceState.currentInvoice && invoiceState.currentInvoice.status
            }
          />
        </Area>

        <Area>
          {invoiceState.currentInvoice &&
            invoiceState.currentInvoice.status !== "paid" && (
              <Fragment>
                <ButtonClickDiv onClick={() => clickHandler()}>
                  <Button
                    bgColor={MyTheme.colors.ui.btnWhite}
                    textColor={MyTheme.colors.text.lightPurple}
                    text={"Edit"}
                  />
                </ButtonClickDiv>

                <ButtonClickDiv
                  onClick={() => {
                    setButtonClick("paid");
                    showConfirmModal();
                  }}
                >
                  <Button
                    bgColor={MyTheme.colors.ui.btnPurple}
                    textColor={"white"}
                    text={"Mark as paid"}
                  />
                </ButtonClickDiv>
              </Fragment>
            )}

          <ButtonClickDiv
            onClick={() => {
              setButtonClick("delete");
              showConfirmModal();
            }}
          >
            <Button
              bgColor={MyTheme.colors.ui.btnRed}
              textColor={"white"}
              text={"Delete"}
            />
          </ButtonClickDiv>
        </Area>
      </Container>
    </Fragment>
  );
}
