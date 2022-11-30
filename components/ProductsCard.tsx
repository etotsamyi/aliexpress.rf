import {FC} from "react";
import styled from "styled-components";
import {observer} from "mobx-react-lite";

interface ProductCardProps {
	id: number;
	name: string;
	price: number;
	amount: number;
	categoryId: number;
	addProductToCart: (groupId: number, id: number) => void;
	currencyRate: number;
	direction: string;
	shouldBeDisabled: boolean;
}

const StyledCard = styled.div`
  //height: 100px;
  width: 60vw;
  background: white;
  margin: 0 10vw 20px 0;
  display: flex;
  flex-direction: column;

  .up {
    color: red;
  }

  .down {
    color: green;
  }
`;

export const ProductCard: FC<ProductCardProps> = observer(({
	                                                           id,
	                                                           name,
	                                                           price,
	                                                           amount,
	                                                           categoryId,
	                                                           addProductToCart,
	                                                           currencyRate,
	                                                           direction,
	                                                           shouldBeDisabled
                                                           }) => {
	return (
		<StyledCard>
			{name}
			<span className={direction}>Цена: {Math.round(price * currencyRate)}₽</span>
			Осталось: {amount}
			<button disabled={shouldBeDisabled} onClick={() => addProductToCart(categoryId, id)}>Купить</button>
		</StyledCard>
	);
});
