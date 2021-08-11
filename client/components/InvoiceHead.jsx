import React, { useContext } from "react";
import Select from "react-select";
import styled from "styled-components";
import { MyTheme } from "../styles/theme/theme";

import Button from "./Button";
import downArrowImage from "../public/assets/icon-arrow-down.svg";

import UIContext from "../context/ui/UIContext";
import InvoiceContext from "../context/invoices/InvoiceContext";

const Container = styled.header`
  width: 100%;
  height: min-content;
  display: flex;
  justify-content: space-between;

  margin-bottom: ${MyTheme.space.xlarge};
`;

const TextArea = styled.div`
  width: 40%;
  height: 100%;

  color: ${MyTheme.colors.text.white};
`;

const Title = styled.h3`
  font-size: ${MyTheme.fontSizes.h3};
  margin-bottom: ${MyTheme.space.medium};
`;
const Caption = styled.p`
  font-size: ${MyTheme.fontSizes.caption};
`;

const FilterandButton = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  width: 100%;
  height: 100%;
`;

const ButtonClickDiv = styled.div``;

const SelectStyles = {
  container: (provided, state) => ({
    ...provided,
    width: "30%",
    backgroundColor: `${MyTheme.colors.bg.sideBar}`,
    borderRadius: `5px`,
  }),
  valueContainer: (provided, state) => ({
    ...provided,
    backgroundColor: `${MyTheme.colors.bg.sideBar}`,
    padding: `${MyTheme.space.medium} ${MyTheme.space.medium}`,
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
  { value: "paid", label: "Show Paid" },
  { value: "pending", label: "Show Pending" },
  { value: "all", label: "Show All" },
];

export default function InvoiceHead() {
  const uiContext = useContext(UIContext);
  const { showInvoiceWindow, setShowType } = uiContext;
  const invoiceContext = useContext(InvoiceContext);
  const { invoiceState } = invoiceContext;

  const clickHandler = () => {
    showInvoiceWindow();
  };

  const selectOnChange = (e) => {
    setShowType(e.value);
  };

  return (
    <Container>
      <TextArea>
        <Title>Invoice</Title>
        <Caption>
          There are a total of {invoiceState.allInvoices.length} invoices.
        </Caption>
      </TextArea>
      <FilterandButton>
        <Select
          styles={SelectStyles}
          options={options}
          onChange={(e) => selectOnChange(e)}
        ></Select>
        <ButtonClickDiv onClick={() => clickHandler()}>
          <Button
            bgColor={MyTheme.colors.ui.btnPurple}
            isPlus={true}
            text={"New Invoice"}
            margin={`0 0 0 ${MyTheme.space.large}`}
          />
        </ButtonClickDiv>
      </FilterandButton>
    </Container>
  );
}
