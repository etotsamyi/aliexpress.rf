import styled from "styled-components";
import {useEffect} from "react";
import {Api} from "../api/hello";

const Main = styled.div`
    background: blue;
`;

export default function Home() {
    useEffect(() => {
        const api = new Api();
        api.getNames();
    }, []);

    return (
        <Main>
            hui
        </Main>
    )
}
