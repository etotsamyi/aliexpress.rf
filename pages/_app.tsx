import "../src/styles/globals.css";
import type { AppProps } from "next/app";
import {useEffect} from "react";
import store from "../src/store/wholeData";
import styled from "styled-components";
import ReactLoading from "react-loading";
import { Header } from "../src/components/Header";
import { observer } from "mobx-react-lite";

const Main = styled.div`
  background: whitesmoke;
  min-height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: auto;
  height: calc(100vh - 45px);
`;

export default observer(function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    let fetchInterval: ReturnType<typeof setInterval>;
    let currencyRandomUpdateInterval: ReturnType<typeof setInterval>;
    currencyRandomUpdateInterval = setInterval(store.randomInteger, 2000);
    // Имитация загрузки
    setTimeout(
      () =>
        store.fetchData().then(() => {
          // fetchInterval = setInterval(store.fetchData, 1000);
        }),
      2000
    );

    return () => {
      clearInterval(currencyRandomUpdateInterval);
      // clearInterval(fetchInterval);
    };
  }, []);

  useEffect(() => console.log('wefef'), [store.currencyRate])
    console.log(store.isLoading, store.storage?.length, 'APP')
  return (
    <>
      <span>{store.currencyRate}</span>
      <Header />
      <Main>
        {store.isLoading && !store.storage?.length ? (
          <ReactLoading type={"bars"} width={100} color={"#4385ff"} />
        ) : null}
        {store.storage?.length ? <Component {...pageProps} /> : null}
      </Main>
    </>
  );
});
