import styled from "styled-components";
import Image from "next/image";
import { MyTheme } from "../styles/theme/theme";

const Container = styled.div`
  background-color: ${(props) =>
    props.status === "paid"
      ? MyTheme.colors.notifications.green
      : props.status === "pending"
      ? MyTheme.colors.notifications.orange
      : MyTheme.colors.notifications.white};
  color: ${(props) =>
    props.status === "paid"
      ? MyTheme.colors.text.green
      : props.status === "pending"
      ? MyTheme.colors.text.orange
      : MyTheme.colors.text.white};

  width: 120px;
  height: min-content;
  border-radius: 10px;
  padding: ${MyTheme.space.medium} ${MyTheme.space.large};

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: ${MyTheme.fontSizes.caption};
`;

export default function Notification({ status }) {
  return <Container status={status}>{status}</Container>;
}
