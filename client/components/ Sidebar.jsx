import styled from "styled-components";
import Image from "next/image";
import { MyTheme } from "../styles/theme/theme";

import logoImage from "../public/assets/logo.svg";
import themeIcon from "../public/assets/icon-sun.svg";
import userImage from "../public/assets/image-avatar.jpg";

const Container = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;

  width: 100px;
  height: 100vh;

  background-color: ${MyTheme.colors.bg.sideBar};

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: 1000px) {
    width: 100vw;
    height: 100px;

    flex-direction: row;
    justify-content: space-between;
  }
`;

const LogoContainer = styled.div`
  position: relative;
  width: 100px;
  min-height: 100px !important;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LogoBGTop = styled.div`
  z-index: 2;
  position: absolute;
  background-color: ${MyTheme.colors.ui.btnPurple};
  width: 100%;
  height: 70%;
  top: 0;
  left: 0;
  border-radius: 0 20px 0 0;
`;

const LogoBGBot = styled.div`
  z-index: 3;
  position: absolute;
  background-color: ${MyTheme.colors.ui.btnPurpleHover};
  width: 100%;
  height: 50%;
  bottom: 0;
  left: 0;
  border-radius: 20px 0 20px 0;
`;

const Logo = styled(Image)`
  z-index: 5;
`;

const ThemeUser = styled.div`
  width: 100%;
  height: min-content;

  @media (max-width: 1000px) {
    height: 100%;
    width: 200px;
    display: flex;
  }
`;

const ThemeChange = styled.div`
  width: 100%;
  height: min-content;
  padding: ${MyTheme.space.large};

  display: flex;
  justify-content: center;
  align-items: center;

  border-bottom: solid 1px ${MyTheme.colors.ui.line};

  @media (max-width: 1000px) {
    height: 100%;
    border: none;
    border-right: solid 1px ${MyTheme.colors.ui.line};
  }
`;

const UserImageDiv = styled.div`
  width: 100%;
  height: min-content;
  padding: ${MyTheme.space.large} ${MyTheme.space.medium};

  display: flex;
  justify-content: center;
  align-items: center;
`;

const UserImage = styled(Image)`
  border-radius: 50%;
`;

export default function Sidebar() {
  return (
    <Container>
      <LogoContainer>
        <LogoBGBot />
        <LogoBGTop />
        <Logo src={logoImage.src} alt="Logo" width={30} height={30} />
      </LogoContainer>

      <ThemeUser>
        <ThemeChange>
          <Image
            src={themeIcon.src}
            width={20}
            height={20}
            alt="theme toggle"
          />
        </ThemeChange>

        <UserImageDiv>
          <UserImage
            src={userImage.src}
            width={35}
            height={35}
            alt="Profile Image"
          />
        </UserImageDiv>
      </ThemeUser>
    </Container>
  );
}
