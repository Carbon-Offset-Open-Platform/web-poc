import dummy from "./dummy";

// TODO make all async
export type Service = {
  findEntity: (id: string) => Entity | undefined
  listProperties: () => Array<Property>
  listTracts: (propertyKey: string, userKey?: string) => Array<Tract>
  listBanks: () => Array<Bank>
  tractDetails: (tractKey: string) => Tract
  bankDetails: (bankKey: string) => Bank
  buy: (propertyKey: string, tractKey: string, userKey: string, amount: number) => boolean;
  sell: (propertyKey: string, tractKey: string, userKey: string, amount: number) => boolean;
}

const service = dummy;
export default service;