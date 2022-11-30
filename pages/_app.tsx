import {Provider} from 'mobx-react'
import {useStore} from '../store'
import {useLayoutEffect} from "react";
import "../styles/globals.css";

let interval = null;
export default function App({Component, pageProps}) {
	const store = useStore(pageProps.initialState);

	useLayoutEffect(() => {
		setTimeout(() => {
			store.fetchData().then((data) => store.constructStorage(data)).then(store.initializeCartFromLocalStorage);
		}, 2000);
		// Генерация числа от 50 до 80
		interval = setInterval(() => {
			store.setCurrencyRate(Math.floor(Math.random() * (80 - 50 + 1)) + 50);
		}, 20000)
		return () => clearInterval(interval)
	}, [store]);

	return (
		<Provider store={store}>
			<Component {...pageProps} />
		</Provider>
	)
}
