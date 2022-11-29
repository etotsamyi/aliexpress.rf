import {FC} from "react";
import styled from "styled-components";

const StyledCart = styled.div`
  width: 25vw;
  position: absolute;
  top: 45px;
  right: 0;
  bottom: 0;
  border-left: 1px solid;
  background: white;
`;

export const Cart: FC = () => {
	return <StyledCart></StyledCart>
}