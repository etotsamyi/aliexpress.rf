import { observer } from "mobx-react-lite";
import wholeData from "../src/store/wholeData";
import store from "../src/store/wholeData";
import styled from "styled-components";
import { FC } from "react";
import { CategorySelector } from "../src/components/CategorySelector";

const StyledCategoriesGrid = styled.div`
  display: grid;
  gap: 50px;
  grid-template-columns: auto auto auto;
`;

const Home: FC = observer(() => {
  if (!store.storage?.length) return null;

  console.log(wholeData.storage, "INDEX");
  return (
    <StyledCategoriesGrid>
      {store.storage.map((category) => {
        return <CategorySelector name={category.name} id={category.groupId} />;
      })}
    </StyledCategoriesGrid>
  );
});

export default Home;
