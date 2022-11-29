import {Provider} from 'mobx-react'
import {useStore} from '../store'
import {useEffect, useLayoutEffect} from "react";
import "../styles/globals.css";

export default function App({Component, pageProps}) {
	const store = useStore(pageProps.initialState);

	useLayoutEffect(() => {
		setTimeout(() => {
			store.fetchData().then((data) => store.constructStorage(data));
		}, 2000)
	}, [store]);

	console.log(store.storage, "STORAGE")
	return (
		<Provider store={store}>
			<Component {...pageProps} />
		</Provider>
	)
}
