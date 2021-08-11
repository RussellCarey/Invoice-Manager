import React, { useContext, useState, Fragment } from "react";
import { MyTheme } from "../styles/theme/theme";
import { Input, Label, Text } from "./InvoiceWindow";
import styled from "styled-components";

const FiveLane = styled.div`
  max-width: 100%;
  display: grid;

  grid-column-gap: ${MyTheme.space.medium};
  grid-template-columns:
    minmax(0, 4fr)
    minmax(0, 2fr)
    minmax(0, 2fr)
    minmax(0, 2fr)
    minmax(0, 1fr);
  margin-bottom: ${(props) => props.mb || null};
`;

export default function InvoiceWindowItem({ mb, index, state, setState }) {
  // Change other firlds
  const changeInputFields = (e) => {
    const array = [...state.items];
    array[index][e.target.id] = e.target.value;
    setState({ ...state, items: array });
  };

  // Change price of QTY
  const changePricingInput = (e) => {
    const array = [...state.items];
    array[index][e.target.id] = e.target.value;
    array[index].total = array[index].price * array[index].qty;
    setState({ ...state, items: array });

    const total = state.items.reduce(
      (total, item) => total + item.price * item.qty,
      0
    );
    setState({ ...state, total: total });
  };

  // Delet a row
  const deleteRow = (index) => {
    const array = [...state.items];
    array.splice(index, 1);
    setState({ ...state, items: array });
  };

  return (
    <FiveLane mb={mb}>
      <Label col={"1/2"} row={"1/2"}>
        Item Name
      </Label>
      <Input
        col={"1/2"}
        row={"2/3"}
        value={state.items[index].name}
        id="name"
        onChange={(e) => changeInputFields(e)}
      />

      <Label col={"2/3"} row={"1/2"}>
        QTY.
      </Label>
      <Input
        col={"2/3"}
        row={"2/3"}
        value={state.items[index].qty}
        id="qty"
        onChange={(e) => changePricingInput(e)}
      />

      <Label col={"3/4"} row={"1/2"}>
        Price
      </Label>
      <Input
        col={"3/4"}
        row={"2/3"}
        value={state.items[index].price}
        id="price"
        onChange={(e) => changePricingInput(e)}
      />

      <Label col={"4/5"} row={"1/2"}>
        Total
      </Label>
      <Text col={"4/5"} row={"2/3"}>
        {state.items[index].total}
      </Text>

      <Text col={"5/6"} row={"2/3"} onClick={deleteRow}>
        DEL
      </Text>
    </FiveLane>
  );
}
