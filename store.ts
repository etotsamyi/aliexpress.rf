import {useMemo} from 'react';
import {applySnapshot, flow, Instance, SnapshotIn, SnapshotOut, types,} from 'mobx-state-tree';
import {IProducts} from "./api/types";
import Fields = IProducts.Fields;
import {Api} from "./api/api";

export const Product = types.model({
	name: types.string,
	id: types.identifierNumber,
	price: types.number,
	amount: types.number,
})

export const Category = types.model({
	name: types.string,
	groupId: types.identifierNumber,
	products: types.array(Product),
})

let store: IStore | undefined;

class IStorageCategory {
	products: any;
}

// public storage: IStorageCategory[] | null = null;
// public isLoading: boolean = true;
// public error: string | null = null;
// public currencyRate: number;

const Store = types
	.model({
		currencyRate: types.number,
		error: types.string,
		isLoading: types.boolean,
		storage: types.array(Category),
		selectedCategoryId: types.number,
		isCartOpened: types.boolean,
	})
	.actions((self) => {
		const setLoading = (value: boolean) => {
			self.isLoading = value;
		}

		const setError = (value: string) => {
			self.error = value;
		}

		const setSelectedCategoryId = (value: number) => {
			self.selectedCategoryId = value;
		}

		const setCartIsOpen = (value: boolean) => {
			self.isCartOpened = value;
		}

		const constructStorage = (data): void => {
			const newStorage: IStorageCategory[] = [];
			const {Goods} = data.products.Value;
			const {names} = data;

			// Находим непустые категории
			const existingCategories = new Set<number>();
			Goods.forEach((product) => {
				existingCategories.add(product[IProducts.Fields.GroupId]);
			});

			Array.from(existingCategories).forEach((groupId: number) => {
				const category: IStorageCategory = Object.assign(
					{
						name: names[groupId].G,
						groupId: groupId,
						products: [],
						currency: 0,
					},
					{}
				);

				Goods.forEach((item) => {
					if (item[Fields.GroupId] === groupId) {
						const product: { amount: number; price: number; name: string; id: number } = Object.assign(
							{
								name: names[groupId].B[item[Fields.Id]].N,
								id: item[Fields.Id],
								price: item[Fields.Price],
								amount: item[Fields.Amount],
							},
							{}
						);
						category.products.push(product);
					}
				});
				newStorage.push(category);
			});
			console.log(newStorage, "builder");
			self.storage = newStorage as any;
		};

		const fetchData = flow(function* () {
			try {
				const data = yield new Api().getFullData();
				// updateStorage(constructStorage(data));
				setLoading(false);
				return data;
			} catch (err) {
				setLoading(false);
				setError(err.error.toString());
			}
		})

		return {
			fetchData,
			constructStorage,
			setLoading,
			setSelectedCategoryId,
			setCartIsOpen
		};
	});

export type IStore = Instance<typeof Store>;
export type IStoreSnapshotIn = SnapshotIn<typeof Store>;
export type IStoreSnapshotOut = SnapshotOut<typeof Store>;

export function initializeStore(snapshot = null) {
	const _store = store ?? Store.create({
		isLoading: true,
		error: '',
		currencyRate: 0,
		selectedCategoryId: 0,
		isCartOpened: false
	});
	// store?.fetchData();

	// If your page has Next.js data fetching methods that use a Mobx store, it will
	// get hydrated here, check `pages/ssg.tsx` and `pages/ssr.tsx` for more details
	if (snapshot) {
		applySnapshot(_store, snapshot);
	}
	// For SSG and SSR always create a new store
	if (typeof window === 'undefined') return _store;
	// Create the store once in the client
	if (!store) store = _store;

	return store;
}

export function useStore(initialState: any) {
	return useMemo(() => initializeStore(initialState), [initialState]);
}
