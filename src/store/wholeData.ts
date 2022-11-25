import {makeAutoObservable, makeObservable, observable, runInAction} from "mobx";
import { Api } from "../api/api";
import { INames, IProducts } from "../api/types";
import Fields = IProducts.Fields;

interface IProduct {
  name: string;
  id: number;
  price: number;
  amount: number;
}

interface IStorageCategory {
  name: string;
  groupId: number;
  products: IProduct[];
  currency: number;
}

class DataStorage {
  public storage: IStorageCategory[] | null = null;
  public isLoading: boolean = true;
  public error: string | null = null;
  public currencyRate: number;

  constructor() {
    this.currencyRate = 0;
    makeAutoObservable(this);
  }

  private constructStorage = (data: {
    names: INames.INamesResponse;
    products: IProducts.IProductResponse;
  }): void => {
    const newStorage: IStorageCategory[] = [];
    const { Goods } = data.products.Value;
    const { names } = data;

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
          const product: IProduct = Object.assign(
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
    console.log(newStorage, "newStorage");
    this.storage = newStorage;
  };

  public fetchData = async () => {
    try {
      const data = await new Api().getFullData();
      runInAction(() => {
        this.constructStorage(data);
        this.isLoading = false;
      });
    } catch (err: any) {
      runInAction(() => {
        this.isLoading = false;
        this.error = err;
      });
    }
  };

  public randomInteger(): void {
    this.currencyRate = Math.round(50 - 0.5 + Math.random() * (80 - 50 + 1));
  }
}

export default new DataStorage();
