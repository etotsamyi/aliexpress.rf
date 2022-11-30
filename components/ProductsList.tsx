import React, {FC} from "react";
import styled from "styled-components";
import {ProductCard} from "./ProductsCard";
import {CartElement, Category} from "../store";
import {Instance} from "mobx-state-tree";
import {observer} from "mobx-react-lite";

interface ProductsListProps {
	selectedCategory: Instance<typeof Category> | null;
	addProductToCart: (groupId: number, id: number) => void;
	currencyRate: number;
	direction: string
	cart: Instance<typeof CartElement>[]
}

const StyledList = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ProductsList: FC<ProductsListProps> = observer(({
	                                                             selectedCategory,
	                                                             addProductToCart,
	                                                             currencyRate,
	                                                             direction,
	                                                             cart
                                                             }) => {
	return (
		<StyledList>
			{selectedCategory?.products.map((product) => {
				const productInCart = cart.find((element) =>
					element.id === product.id && element.groupId === selectedCategory.groupId)

				const shouldBeDisabled = product.amount >= productInCart?.amount
				return <ProductCard
					key={product.id}
					categoryId={selectedCategory.groupId}
					addProductToCart={addProductToCart}
					currencyRate={currencyRate}
					direction={direction}
					shouldBeDisabled={shouldBeDisabled}
					{...product}
				/>
			})}
		</StyledList>
	)
})
