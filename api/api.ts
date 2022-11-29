import axios, {AxiosResponse} from "axios";
import {INames, IProducts} from "./types";

interface IRoutes {
	namesUrl: string;
	productsUrl: string;
}

export class Api {
	private readonly routes: IRoutes;

	constructor() {
		this.routes = {
			namesUrl:
				"https://s3.us-west-2.amazonaws.com/secure.notion-static.com/03c05415-f6bb-4c22-b5eb-17f135da8593/Untitled.json?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20221128%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221128T123452Z&X-Amz-Expires=86400&X-Amz-Signature=4101c0679a73744adb2e55783e7ec56bca4bec1df90d1792b59b9a98e4ecc404&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22names.json%22&x-id=GetObject",
			productsUrl:
				"https://s3.us-west-2.amazonaws.com/secure.notion-static.com/8843149f-97a7-4a2b-a6be-ca897b9c6627/Untitled.json?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20221128%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221128T123529Z&X-Amz-Expires=86400&X-Amz-Signature=4fba9ab46bb53d515d1edc5cc6cff23d830810fd1ce31643615402800d5ddd6d&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22products.json%22&x-id=GetObject"
		};
	}

	private getNames = async () => {
		return await axios.get(this.routes.namesUrl);
	};

	private getProducts = async () => {
		return await axios.get(this.routes.productsUrl);
	};

	public getFullData = async (): Promise<{
		names: INames.INamesResponse;
		products: IProducts.IProductResponse;
	}> => {
		const names: AxiosResponse<INames.INamesResponse> = await this.getNames();
		const products: AxiosResponse<IProducts.IProductResponse> =
			await this.getProducts();
		return {names: names.data, products: products.data};
	};
}
