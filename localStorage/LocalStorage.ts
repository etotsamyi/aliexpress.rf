export default class LocalStorage {
	static add = (field: string, value: any): void => {
		console.log(value, 'value')
		if (typeof value !== 'string') {
			const withoutProxy = JSON.parse(JSON.stringify(value))
			console.log(withoutProxy, 'withoutProxy')
			localStorage.setItem(field, JSON.stringify(withoutProxy));
			return;
		}

		localStorage.setItem(field, value);
	}

	static delete = (field: string): void => {
		localStorage.removeItem(field)
	}

	static get = <T>(field: string): T | null => {
		console.log(localStorage.getItem(field));
		return JSON.parse(localStorage.getItem(field));
	}
}
