import {FC} from "react";
import styled from "styled-components";
import {observer} from "mobx-react-lite";

interface ProductCardProps {
	id: number;
	name: string;
	price: number;
	amount: number;
}

const StyledCard = styled.div`
  height: 60px;
  background: white;
  margin: 0 0 20px 0;
`;

export const ProductCard: FC<ProductCardProps> = observer(({id, name, price, amount}) => {
	return (
		<StyledCard>
			{name}
			Цена: {price}
			Осталось: {amount}
			<button>Купить</button>
		</StyledCard>
	);
});
