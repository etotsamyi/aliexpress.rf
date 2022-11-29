export namespace INames {
    export interface INamesProduct {
        [key: string]: {
            "N": string;
        }
    }

    export interface INamesCategory {
        "G": string;
        "B": INamesProduct;
    }

    export interface INamesResponse {
        [key: string]: INamesCategory
    }
}

export namespace IProducts {
    // - "C" - цена товара в долларах
    // - "G" - id группы
    // - "T" - id товара
    // - "P" - количество

    export enum Fields {
        Price = "C",
        GroupId = "G",
        Id = "T",
        Amount = "P"
    }

    export interface IProduct {
        [Fields.Price]: number;
        [Fields.GroupId]: number;
        [Fields.Id]: number;
        [Fields.Amount]: number;
    }

    export interface IProductResponse {
        Value: {
            Goods: IProduct[]
        }
    }
}