import {FC, useCallback} from "react";
import styled from "styled-components";
import {IStore} from "../store";
import {observer} from "mobx-react-lite";

const StyledCart = styled.div<{ isCartOpened: boolean }>`
  width: 25vw;
  position: absolute;
  top: 45px;
  right: 0;
  bottom: 0;
  border-left: 1px solid;
  background: white;
  visibility: ${props => props.isCartOpened ? "visible" : "hidden"};
  opacity: ${props => props.isCartOpened ? "1" : "0"};
  transition: opacity 200ms, visibility 200ms;
  overflow: auto;
  max-height: calc(100vh - 45px);
`;

const StyledProductInCart = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 18px;
`;

interface CartProps {
	store?: IStore
}

export const Cart: FC<CartProps> = observer(({store}) => {
	const {cart, storage, addProductToCart, removeProductFromCart, currencyRate} = store;


	const findElementInStorage = useCallback((groupId: number, id: number) => {
		const category = storage.find((category) => category.groupId === groupId);
		let product = null;
		if (category) {
			product = category.products.find((product) => product.id === id)
		}
		return product;
	}, []);

	const cartSum = () => {
		return cart.reduce((acc, product) => {
			const productInCart = findElementInStorage(product.groupId, product.id)
			if (!productInCart) return null;

			return product.amount * productInCart.price + acc
		}, 0)
	}

	return (
		<StyledCart isCartOpened={store.isCartOpened}>
			<h3>Корзина</h3>
			<div>Сумма: {Math.round(cartSum() * currencyRate)}₽</div>
			{
				cart.map((element) => {
					const productInCart = findElementInStorage(element.groupId, element.id)
					if (!productInCart) return null;
					const shouldBeDisabled = element.amount >= productInCart.amount;

					return (
						<StyledProductInCart key={`${element.groupId}${element.id}`}>
							{productInCart.name} {Math.round(productInCart.price * currencyRate)}₽ {element.amount}
							<button disabled={shouldBeDisabled}
							        onClick={() => addProductToCart(element.groupId, element.id)}>+
							</button>
							<button onClick={() => removeProductFromCart(element.groupId, element.id)}>-</button>
						</StyledProductInCart>
					)
				})
			}
		</StyledCart>
	)
});
