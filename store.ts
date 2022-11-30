import {useMemo} from 'react';
import {applySnapshot, cast, flow, Instance, types} from 'mobx-state-tree';
import {IProducts} from "./api/types";
import Fields = IProducts.Fields;
import {Api} from "./api/api";
import LocalStorage from "./localStorage/LocalStorage";

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

export const CartElement = types.model({
	groupId: types.number,
	id: types.number,
	amount: types.number,
})

let store: IStore | undefined;

class IStorageCategory {
	products: any;
}

export enum Direction {
	Up = 'up',
	Down = 'down',
	Same = 'same'
}

const Store = types
	.model({
		currencyRate: types.number,
		direction: types.string,
		error: types.string,
		isLoading: types.boolean,
		storage: types.array(Category),
		selectedCategoryId: types.number,
		isCartOpened: types.boolean,
		cart: types.array(CartElement)
	})
	.actions((self) => {
		const setCurrencyRate = (value: number) => {
			if (self.currencyRate > value) {
				self.direction = Direction.Down
			} else if (self.currencyRate === value || self.currencyRate === 0) {
				self.direction = Direction.Same
			} else {
				self.direction = Direction.Up
			}

			self.currencyRate = value;
			LocalStorage.add('currency', value);
		}

		const addProductToCart = (groupId: number, id: number) => {
			const existingIndex = self.cart.findIndex((element) => element.id === id && element.groupId === groupId);

			if (existingIndex > -1) {
				self.cart[existingIndex].amount += 1;
				LocalStorage.add('cart', self.cart)
				return;
			}

			self.cart.push({groupId, id, amount: 1})
			LocalStorage.add('cart', self.cart)
		}

		const removeProductFromCart = (groupId: number, id: number) => {
			const existingIndex = self.cart.findIndex((element) => element.id === id && element.groupId === groupId);

			if (existingIndex === -1) return;

			if (self.cart[existingIndex].amount === 1) {
				const newCart = self.cart.filter((element) => !(element.id === id && element.groupId === groupId));
				self.cart = cast(newCart)
				LocalStorage.add('cart', self.cart)
				return;
			}
			self.cart[existingIndex].amount -= 1;
			LocalStorage.add('cart', self.cart)
		}

		const initializeCartFromLocalStorage = () => {
			if (typeof window === 'undefined') return;
			const localCart = LocalStorage.get<Instance<typeof CartElement>[]>('cart');
			const localCurrencyRate = LocalStorage.get<number>('currency')

			if (localCart.length) {
				self.cart = localCart as any;
				self.isCartOpened = true;
			}

			if (localCurrencyRate) {
				self.currencyRate = localCurrencyRate
			}
		}

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
				console.log(err)
				setLoading(false);
				setError(err.error?.toString());
			}
		})

		return {
			fetchData,
			constructStorage,
			setLoading,
			setSelectedCategoryId,
			setCartIsOpen,
			addProductToCart,
			removeProductFromCart,
			setCurrencyRate,
			initializeCartFromLocalStorage
		};
	});

export type IStore = Instance<typeof Store>;

export function initializeStore(snapshot = null) {
	const _store = store ?? Store.create({
		isLoading: true,
		error: '',
		currencyRate: 0,
		direction: Direction.Same,
		selectedCategoryId: 0,
		isCartOpened: false,
		cart: []
	});

	if (snapshot) {
		applySnapshot(_store, snapshot);
	}
	if (typeof window === 'undefined') return _store;
	if (!store) store = _store;

	return store;
}

export function useStore(initialState: any) {
	return useMemo(() => initializeStore(initialState), [initialState]);
}
