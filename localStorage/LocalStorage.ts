export default class LocalStorage {
	static add = (field: string, value: any): void => {
		if (typeof value !== 'string') {
			const withoutProxy = JSON.parse(JSON.stringify(value))
			localStorage.setItem(field, JSON.stringify(withoutProxy));
			return;
		}

		localStorage.setItem(field, value);
	}

	static delete = (field: string): void => {
		localStorage.removeItem(field)
	}

	static get = <T>(field: string): T | null => {
		return JSON.parse(localStorage.getItem(field));
	}
}
