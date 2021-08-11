import React, { useContext, useState, useEffect, Fragment } from "react";
import { useRouter } from "next/router";
import Select from "react-select";
import styled from "styled-components";
import { MyTheme } from "../styles/theme/theme";

import Button from "./Button";

import UIContext from "../context/ui/UIContext";
import InvoiceContext from "../context/invoices/InvoiceContext";
import InvoiceWindowItem from "./InvoiceWindowItem";

import * as dayjs from "dayjs";
import WarningScreen from "./WarningScreen";

// CONTAINERS
const Container = styled.div`
  z-index: 40;
  background-color: #0000008d;
  width: 100vw;
  height: 100%;

  position: absolute;
  top: 0;
  left: 0;
`;

const Window = styled.div`
  z-index: 50;
  width: 500px;
  height: 100vh;
  padding: ${MyTheme.space.large};

  position: absolute;
  top: 0;
  left: 100px;

  display: flex;
  flex-direction: column;

  background-color: ${MyTheme.colors.bg.primary};

  overflow-y: scroll;

  @media (max-width: 1000px) {
    width: 500px;
    top: 100px;
    left: 0px;
  }

  @media (max-width: 700px) {
    width: 400px;
    top: 100px;
    left: 0px;
  }

  @media (max-width: 600px) {
    width: 100vw;
    top: 100px;
    left: 0px;
  }
`;

const TwoLane = styled.div`
  max-width: 100%;
  display: grid;
  grid-column-gap: ${MyTheme.space.medium};
  grid-template-columns: repeat(2, minmax(0, 1fr));
  margin-bottom: ${(props) => props.mb || null};
`;

const ThreeLane = styled.div`
  max-width: 100%;
  display: grid;
  grid-column-gap: ${MyTheme.space.medium};
  grid-template-columns: repeat(3, minmax(0, 1fr));
  margin-bottom: ${(props) => props.mb || null};
`;
//INPUT, DATE AND SELECT
export const Input = styled.input`
  border: solid 1px ${MyTheme.colors.ui.border};
  outline: 0;
  color: ${MyTheme.colors.text.white};
  font-size: ${MyTheme.fontSizes.caption};
  padding: ${MyTheme.space.medium} ${MyTheme.space.medium};
  border-radius: 5px;

  background-color: ${MyTheme.colors.bg.sideBar};

  grid-row: ${(props) => props.row || null};
  grid-column: ${(props) => props.col || null};
  margin-bottom: ${(props) => props.mb || null};
`;

const SelectStyles = {
  valueContainer: (provided, state) => ({
    ...provided,
    backgroundColor: `${MyTheme.colors.bg.sideBar}`,
    padding: `${MyTheme.space.medium} ${MyTheme.space.medium}`,
    borderRadius: `5px`,
  }),
  container: (provided, state) => ({
    ...provided,
    backgroundColor: `${MyTheme.colors.bg.sideBar}`,
    borderRadius: `5px`,
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    backgroundColor: `${MyTheme.colors.bg.sideBar}`,
  }),
  control: (provided, state) => ({
    ...provided,
    backgroundColor: `${MyTheme.colors.bg.sideBar}`,
    border: "none",
    outline: "none",
  }),
  placeholder: (provided, state) => ({
    ...provided,
    color: `${MyTheme.colors.text.white}`,
    fontSize: `${MyTheme.fontSizes.caption}`,
  }),
  menuList: (provided, state) => ({
    ...provided,
    backgroundColor: `${MyTheme.colors.bg.sideBar}`,
    color: `${MyTheme.colors.text.white}`,
    fontSize: `${MyTheme.fontSizes.caption}`,
  }),
  singleValue: (provided, state) => ({
    ...provided,
    color: `${MyTheme.colors.text.white}`,
    fontSize: `${MyTheme.fontSizes.caption}`,
  }),
};

const options = [
  { value: 1, label: "1 Day" },
  { value: 2, label: "2 Days" },
  { value: 7, label: "7 Days" },
  { value: 14, label: "14 Days" },
  { value: 30, label: "30 Days" },
];

export const DateInput = styled.input`
  border: solid 1px ${MyTheme.colors.ui.border};
  outline: 0;
  color: ${MyTheme.colors.text.white};
  font-size: ${MyTheme.fontSizes.caption};
  padding: ${MyTheme.space.medium} ${MyTheme.space.medium};
  border-radius: 5px;

  background-color: ${MyTheme.colors.bg.sideBar};

  grid-row: ${(props) => props.row || null};
  grid-column: ${(props) => props.col || null};
  margin-bottom: ${(props) => props.mb || null};
`;

// TEXTS
const Title = styled.p`
  color: ${MyTheme.colors.text.purple};
  font-size: ${MyTheme.fontSizes.caption};
  margin-bottom: ${MyTheme.space.medium};
`;

const GreyTitle = styled.p`
  color: ${MyTheme.colors.text.purple};
  font-size: ${MyTheme.fontSizes.body};
  margin-bottom: ${(props) => props.mb || null};
`;

export const Label = styled.label`
  color: ${MyTheme.colors.text.white};
  font-size: ${MyTheme.fontSizes.caption};
  margin-bottom: ${MyTheme.space.small};

  grid-row: ${(props) => props.row || null};
  grid-column: ${(props) => props.col || null};
`;

export const Text = styled.p`
  color: ${MyTheme.colors.text.white};
  font-size: ${MyTheme.fontSizes.caption};
  align-self: center;

  grid-row: ${(props) => props.row || null};
  grid-column: ${(props) => props.col || null};
`;

// BUTTONS
const NewItemButton = styled.button`
  border: 0;
  outline: 0;
  border-radius: 20px;
  font-size: ${MyTheme.fontSizes.body};
  color: ${MyTheme.colors.white};
  width: 100%;
  padding: ${MyTheme.space.medium} ${MyTheme.space.small};
  background-color: ${MyTheme.colors.bg.sideBar};
  margin-bottom: ${(props) => props.mb || null};
`;

const ButtonDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  & > * {
    margin-bottom: ${MyTheme.space.medium};
  }

  @media (max-width: 600px) {
    position: fixed;
    bottom: 0;
    left: 0;

    height: min-content;
    padding: ${MyTheme.space.medium} 0;
    flex-wrap: wrap;
    align-items: center;
    background-color: ${MyTheme.colors.bg.sideBar};
  }
`;

const ButtonClickDiv = styled.div``;

export default function InvoiceWindow({ isNewWindow, invoice }) {
  const router = useRouter();

  const [form, setForm] = useState({
    billerId: "",
    billerUsename: "",
    billerStreet: "",
    billerCity: "",
    billerPostCode: "",
    billerCountry: "",
    clientName: "",
    clientEmail: "",
    clientStreetAddress: "",
    clientCity: "",
    clientPostCode: "",
    clientCountry: "",
    clientIssueDate: "",
    clientPaymentTerms: "",
    projectDescription: "",
    items: [],
    total: "",
    status: null,
  });

  const uiContext = useContext(UIContext);
  const { showInvoiceWindow, state, showConfirmModal, hideConfirmModal } =
    uiContext;
  const invoiceContext = useContext(InvoiceContext);
  const { invoiceState, createInvoice, updateInvoice } = invoiceContext;

  useEffect(() => {
    invoiceState.currentInvoice ? setForm(invoiceState.currentInvoice) : null;
  }, []);

  const onInputText = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const onChangeClientPaymentTerms = (e) => {
    console.log(e);
    setForm({ ...form, clientPaymentTerms: e.value });
  };

  const createNewInvoice = async () => {
    const invoice = { ...form };
    const newInvoice = createInvoice(invoice);
    hideConfirmModal();
    showInvoiceWindow();
    router.reload(window.location.pathname);
  };

  const submitInvoiceEdit = () => {
    const invoice = { ...form };
    const editedInvoice = updateInvoice(invoice);
    hideConfirmModal();
    showInvoiceWindow();
    router.reload(window.location.pathname);
  };

  const onNewRowClick = () => {
    setForm({
      ...form,
      items: [...form.items, { price: "", name: "", qty: "", total: "" }],
    });
  };

  return (
    <Fragment>
      {state.showModal && isNewWindow ? (
        <WarningScreen
          title={"Confirm new invoice."}
          text={"Are you sure you want to subit this invoice?"}
          funcToRun={createNewInvoice}
        />
      ) : null}
      {state.showModal && !isNewWindow ? (
        <WarningScreen
          title={"Confirm edit."}
          text={"Are you sure you want to save this edit?"}
          funcToRun={submitInvoiceEdit}
        />
      ) : null}
      <Container>
        <Window>
          <Title>Bill Form</Title>
          <Label>Street Address</Label>
          <Input
            mb={MyTheme.space.medium}
            value={form.billerStreet}
            id="billerStreet"
            onChange={(e) => onInputText(e)}
          />

          <ThreeLane mb={MyTheme.space.large}>
            <Label col={"1/2"} row={"1/2"}>
              City
            </Label>
            <Input
              col={"1/2"}
              row={"2/3"}
              value={form.billerCity}
              id="billerCity"
              onChange={(e) => onInputText(e)}
            />
            <Label col={"2/3"} row={"1/2"}>
              Post Code
            </Label>
            <Input
              col={"2/3"}
              row={"2/3"}
              value={form.billerPostCode}
              id="billerPostCode"
              onChange={(e) => onInputText(e)}
            />
            <Label col={"3/4"} row={"1/2"}>
              Country
            </Label>
            <Input
              col={"3/4"}
              row={"2/3"}
              value={form.billerCountry}
              id="billerCountry"
              onChange={(e) => onInputText(e)}
            />
          </ThreeLane>

          <Title>Bill To</Title>
          <Label>Clients Name</Label>
          <Input
            mb={MyTheme.space.medium}
            value={form.clientName}
            id="clientName"
            onChange={(e) => onInputText(e)}
          />
          <Label>Clients Email</Label>
          <Input
            mb={MyTheme.space.medium}
            value={form.clientEmail}
            id="clientEmail"
            onChange={(e) => onInputText(e)}
          />
          <Label>Street Address</Label>
          <Input
            mb={MyTheme.space.medium}
            value={form.clientStreetAddress}
            id="clientStreetAddress"
            onChange={(e) => onInputText(e)}
          />

          <ThreeLane mb={MyTheme.space.large}>
            <Label col={"1/2"} row={"1/2"}>
              City
            </Label>
            <Input
              col={"1/2"}
              row={"2/3"}
              value={form.clientCity}
              id="clientCity"
              onChange={(e) => onInputText(e)}
            />
            <Label col={"2/3"} row={"1/2"}>
              Post Code
            </Label>
            <Input
              col={"2/3"}
              row={"2/3"}
              value={form.clientPostCode}
              id="clientPostCode"
              onChange={(e) => onInputText(e)}
            />
            <Label col={"3/4"} row={"1/2"}>
              Country
            </Label>
            <Input
              col={"3/4"}
              row={"2/3"}
              value={form.clientCountry}
              id="clientCountry"
              onChange={(e) => onInputText(e)}
            />
          </ThreeLane>

          <TwoLane mb={MyTheme.space.medium}>
            <Label col={"1/2"} row={"1/2"}>
              Issue Date
            </Label>
            <Input
              timezone="en-US"
              type="date"
              col={"1/2"}
              row={"2/3"}
              value={form.clientIssueDate}
              id="clientIssueDate"
              onChange={(e) => onInputText(e)}
            />

            <Label col={"2/3"} row={"1/2"}>
              Payment Terms
            </Label>
            <Select
              col={"2/3"}
              row={"2/3"}
              setValue={form.clientPaymentTerms}
              id="clientPaymentTerms"
              onChange={(e) => onChangeClientPaymentTerms(e)}
              styles={SelectStyles}
              options={options}
            />
          </TwoLane>

          <Label>Project Description</Label>
          <Input
            mb={MyTheme.space.large}
            onChange={(e) => onInputText(e)}
            id="projectDescription"
            value={form.projectDescription}
          />

          <GreyTitle mb={MyTheme.space.medium}>Items</GreyTitle>

          {form.items.map((item, indx) => {
            return (
              <InvoiceWindowItem
                key={item.invoiceId}
                index={indx}
                state={form}
                setState={setForm}
                id={item.invoiceId}
                mb={MyTheme.space.medium}
              />
            );
          })}

          <NewItemButton onClick={onNewRowClick} mb={MyTheme.space.large}>
            + Add New Item
          </NewItemButton>

          <ButtonDiv>
            <ButtonClickDiv onClick={() => showInvoiceWindow()}>
              <Button
                onClick={() => closeNewWindow()}
                bgColor={MyTheme.colors.bg.white}
                textColor={MyTheme.colors.text.lightPurple}
                text={"Go Back"}
              />
            </ButtonClickDiv>

            <ButtonClickDiv onClick={showConfirmModal}>
              <Button
                bgColor={MyTheme.colors.ui.btnPurple}
                textColor={MyTheme.colors.text.white}
                text={isNewWindow ? "Submit New" : "Submit Edit"}
              />
            </ButtonClickDiv>
          </ButtonDiv>
        </Window>
      </Container>
    </Fragment>
  );
}
