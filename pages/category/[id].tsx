import styled from "styled-components";
import { useRouter } from "next/router";
import { observer } from "mobx-react-lite";
import store from "../../src/store/wholeData";
import { ProductCard } from "../../src/components/ProductCard";

const Main = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function Page() {
  if (!store.storage?.length) return null;
  const router = useRouter();
  const selectedCategory = store.storage.find(
    (el) => el.groupId === Number(router.query.id)
  );

  // Добавить 404
  if (!selectedCategory) return null;
  console.log(store.currencyRate, store.isLoading, "rate", "loading")
  return (
    <Main>
      {selectedCategory.products.map((product) => {
        return <ProductCard key={product.id} {...product} currencyRate={store.currencyRate}/>;
      })}
    </Main>
  );
};
