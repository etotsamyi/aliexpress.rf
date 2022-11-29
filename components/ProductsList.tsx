import React, {FC} from "react";
import styled from "styled-components";
import {ProductCard} from "./ProductsCard";
import {Category} from "../store";
import {Instance} from "mobx-state-tree";

interface ProductsListProps {
	selectedCategory: Instance<typeof Category>
}

const StyledList = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ProductsList: FC<ProductsListProps> = ({selectedCategory}) => {
	return (
		<StyledList>
			{selectedCategory.products.map((product) => {
				return <ProductCard key={product.id} {...product} />
			})}
		</StyledList>
	)
}