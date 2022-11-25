import axios, { AxiosResponse } from "axios";
import { INames, IProducts } from "./types";

interface IRoutes {
  namesUrl: string;
  productsUrl: string;
}

export class Api {
  private readonly routes: IRoutes;

  constructor() {
    this.routes = {
      namesUrl:
        "https://s3.us-west-2.amazonaws.com/secure.notion-static.com/03c05415-f6bb-4c22-b5eb-17f135da8593/Untitled.json?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20221125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221125T175003Z&X-Amz-Expires=86400&X-Amz-Signature=604b0be1a2391c9fa07f6ae10a887b6cc083f021ec13e70414d67377d5108733&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22names.json%22&x-id=GetObject",
      productsUrl:
        "https://s3.us-west-2.amazonaws.com/secure.notion-static.com/8843149f-97a7-4a2b-a6be-ca897b9c6627/Untitled.json?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20221125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221125T175059Z&X-Amz-Expires=86400&X-Amz-Signature=5ba8c4856a5e1cb2a6bb97675aa9e5ef8f6ad0d2f463b4a598649cfa58dcfbfd&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22products.json%22&x-id=GetObject",
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
    return { names: names.data, products: products.data };
  };
}
