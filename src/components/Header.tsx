import { FC } from "react";
import { LogoIcon } from "../icons/LogoIcon";
import styled from "styled-components";
import Link from "next/link";
import { observer } from "mobx-react-lite";
import { CartLogo } from "../icons/CartLogo";

const StyledHeader = styled.div`
  height: 45px;
  background: #0f3f00;
  display: flex;
  justify-content: space-between;
  box-shadow: rgba(0, 0, 0, 0.35) 15px 55px 15px;
  overflow: visible;
`;

const StyledHeaderLogo = styled(Link)`
  background: #970101;
  border-right: solid 1px yellow;
  padding: 0 30px;
  cursor: pointer;
  user-select: none;
  color: yellow;
  font-size: 24px;
  font-style: italic;
  font-weight: bold;
  display: flex;
  align-items: center;
  border-bottom-right-radius: 10px;
  border-top-right-radius: 10px;

  path {
    fill: yellow;
  }

  &:hover {
    border-color: white;
    color: white;
    transition: 400ms border, 400ms color;

    path {
      transition: 400ms;
      fill: white;
    }
  }
`;

const StyledLogoIcon = styled.div`
  margin-right: 16px;
  display: flex;
  align-items: center;
`;

const StyledCartBlock = styled.div`
  background: #970101;
  border-left: solid 1px yellow;
  padding: 0 30px;
  cursor: pointer;
  user-select: none;
  color: yellow;
  display: flex;
  align-items: center;
  border-bottom-left-radius: 10px;
  border-top-left-radius: 10px;

  path {
    fill: yellow;
  }

  &:hover {
    border-color: white;
    color: white;
    transition: 400ms border, 400ms color;

    path {
      transition: 400ms;
      fill: white;
    }
`;

export const Header: FC = observer(() => {
  return (
    <StyledHeader>
      <StyledHeaderLogo href={"/"}>
        <StyledLogoIcon>
          <LogoIcon />
        </StyledLogoIcon>
        <span>Вкусно и точка.</span>
      </StyledHeaderLogo>
      <StyledCartBlock>
        <CartLogo />
      </StyledCartBlock>
    </StyledHeader>
  );
});
