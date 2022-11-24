import axios from "axios";

interface IRoutes {
  namesUrl: string;
  productsUrl: string;
}

export class Api {
  private routes: IRoutes;

  constructor() {
    this.routes = {
      namesUrl: 'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/03c05415-f6bb-4c22-b5eb-17f135da8593/Untitled.json?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20221124%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221124T102933Z&X-Amz-Expires=86400&X-Amz-Signature=1e16161319ebba7f400dc958aed7ac640e1e5a8e6652e7da930dc15a257eec42&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22names.json%22&x-id=GetObject',
      productsUrl: 'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/8843149f-97a7-4a2b-a6be-ca897b9c6627/Untitled.json?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20221124%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221124T103005Z&X-Amz-Expires=86400&X-Amz-Signature=8d253032eb2aa06c1964ce7bff4ced54b093d43ec958036e240d3b006b26faa8&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22products.json%22&x-id=GetObject'
    }
  }

  public getNames = async () => {
    const res = await axios.get(this.routes.namesUrl)
    console.log(res.data)
  }
}
