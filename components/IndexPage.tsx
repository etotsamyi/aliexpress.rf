import React, {useCallback, useMemo} from 'react'
import {observer} from 'mobx-react-lite'
import {IStore, useStore} from '../store'
import {CategorySelector} from "./CategorySelector";
import styled from "styled-components";
import {ProductsList} from "./ProductsList";
import {Cart} from "./Cart";

interface IndexPageProps {
	store?: IStore
}

const StyledLayout = styled.div`
  display: grid;
  gap: 50px;
  grid-template-columns: auto auto auto;
`;

const IndexPage: React.FC<IndexPageProps> = observer((props) => {
	const store = useStore(props.store);
	const {storage, setSelectedCategoryId, selectedCategoryId, addProductToCart, currencyRate, direction, cart} = store

	const selectCategoryId = useCallback((id: number) => {
		setSelectedCategoryId(id);
	}, []);

	const selectedCategory = useMemo(() => {
		if (!selectedCategoryId) return null;
		const category = storage.find((category) => category.groupId === selectedCategoryId);
		return category ? category : null;
	}, [selectedCategoryId]);

	return (
		<>
			<StyledLayout>
				{!selectedCategoryId && storage.map((category) => {
					return (
						<CategorySelector
							key={category.groupId}
							name={category.name}
							id={category.groupId}
							selectCategory={selectCategoryId}
						/>
					)
				})}
				{!!selectedCategoryId && (
					<ProductsList
						currencyRate={currencyRate}
						selectedCategory={selectedCategory}
						addProductToCart={addProductToCart}
						direction={direction}
						cart={cart}
					/>
				)}

			</StyledLayout>
			<Cart store={store}/>
		</>

	)
})

export default IndexPage
