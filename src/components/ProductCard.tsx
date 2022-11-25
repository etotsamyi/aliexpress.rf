import { FC } from "react";
import styled from "styled-components";
import { observer } from "mobx-react-lite";
import store from "../store/wholeData";

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  amount: number;
  currencyRate: number;
}

const StyledCard = styled.div`
  height: 60px;
  background: white;
  margin: 0 0 20px 0;
`;

export const ProductCard: FC<ProductCardProps> = ({
  id,
  name,
  price,
  amount,
  currencyRate,
}) => {
  console.log(currencyRate);

  return (
    <StyledCard>
      {currencyRate}
      {name}
      Цена: {price}
      Осталось: {amount}
    </StyledCard>
  );
};
