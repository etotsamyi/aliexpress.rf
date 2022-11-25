import { FC } from "react";
import Link from "next/link";
import styled from "styled-components";
import { FoodIcon } from "../icons/FoodIcon";

interface CategorySelectorProps {
  name: string;
  id: number;
}

const StyledLink = styled(Link)`
    width: 200px;
    height: 200px;
    background: #ffecc0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 15px;
    box-shadow: rgba(0, 0, 0, 0.35) 0 5px 20px;

    &:hover {
        transition: box-shadow 400ms;
        box-shadow: rgba(6, 24, 44, 0.4) 0 0 0 2px, rgba(6, 24, 44, 0.65) 0 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset;
    }

    &:active {
        box-shadow: rgba(0, 0, 0, 0.35) 0 5px 15px;
    }
`;

export const CategorySelector: FC<CategorySelectorProps> = ({ id, name }) => {
  return (
    <StyledLink href={`./category/${id}`}>
      <FoodIcon />
      <div>{name}</div>
    </StyledLink>
  );
};
