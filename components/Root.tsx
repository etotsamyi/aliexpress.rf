import React from 'react'
import {observer} from 'mobx-react-lite'
import {IStore, useStore} from '../store'
import ReactLoading from "react-loading";
import {Header} from "./Header";
import styled from "styled-components";

interface RootProps {
	store?: IStore;
	title: string;
	children: React.ReactNode
}

const Main = styled.div`
  background: whitesmoke;
  min-height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 45px);
`;

const Root: React.FC<RootProps> = observer((props) => {
	const store = useStore(props.store)

	return (
		<div>
			<>
				<Header store={store}/>
				{/*<span>{store.currencyRate}</span>*/}
				<Main>
					{store.isLoading && !store.storage?.length ? (
						<ReactLoading type={"bars"} width={100} color={"#4385ff"}/>
					) : null}
					{props.children}
				</Main>
			</>
		</div>
	)
})

export default Root;
