import styled from "styled-components";
import Button from "./Button";
import { MyTheme } from "../styles/theme/theme";

import Notification from "./Notification";

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

export default function InvoiceBar() {
  return (
    <Container>
      <Area>
        <Text>Status</Text>
        <Notification status={"pending"} />
      </Area>

      <Area>
        <Button
          bgColor={MyTheme.colors.ui.btnWhite}
          textColor={MyTheme.colors.text.lightPurple}
          text={"Edit"}
        />
        <Button
          bgColor={MyTheme.colors.ui.btnRed}
          textColor={"white"}
          text={"Delete"}
        />
        <Button
          bgColor={MyTheme.colors.ui.btnPurple}
          textColor={"white"}
          text={"Mark as paid"}
        />
      </Area>
    </Container>
  );
}
