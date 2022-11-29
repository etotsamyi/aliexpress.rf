import Root from '../components/Root'
import {initializeStore} from "../store";
import {getSnapshot} from "mobx-state-tree";
import IndexPage from "../components/IndexPage";

export default function Home(props) {
	return (
		<Root title="Index Page">
			<IndexPage {...props} />
		</Root>
	)
}

export function getServerSideProps() {
	const store = initializeStore();

	return {props: {initialState: getSnapshot(store)}}
}
