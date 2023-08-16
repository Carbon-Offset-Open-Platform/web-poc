import { useDummyStore } from "@/store/dummy";
import { Service } from "./service";

const store = useDummyStore();

if (store.banks.length < 1) {
  store.banks = [
    {
      key: "73456",
      name: "Commerce Bank",
    },
    {
      key: "89243",
      name: "Fiduciary Bank",
    }];
}

if (store.properties.length < 1) {
  store.properties = [{
    name: "Reserva Natural Sabalito",
    key: '43792',
    geolocation: [8.5, 82.53],
  }];
}

if (store.tracts.length < 1) {
  function tract(name: string, key: string, area: number, geolocation: GeoLocation, bank: string) {
    const available = (area * 500) / 10000;
    store.tracts.push({ name, key, area, geolocation, available, bank, inventory: [] });
  }
  tract(
    "2023 plantings",
    "12475",
    1405,
    [8.50, 82.53],
    store.banks[0].key);

  tract(
    "Old growth forest",
    "89062",
    344293,
    [8.50, 82.54],
    store.banks[0].key);

  tract(
    "Pine plantings",
    "38194",
    18853,
    [8.50, 82.54],
    store.banks[1].key);

  tract(
    "1988 plantings",
    "51327",
    39143,
    [8.50, 82.53],
    store.banks[1].key);

  tract(
    "2nd growth, acacia, cacao",
    "75640",
    166537,
    [8.50, 82.53],
    store.banks[1].key);
  tract(
    "Ana's palm garden",
    "26983",
    14669,
    [8.49, 82.53],
    store.banks[1].key);

  tract(
    "Pine and cacao planting",
    "94857",
    54134,
    [8.50, 82.54],
    store.banks[1].key);
}

function byKey<T extends HasKey>(list: Array<T>, key: string) {
  const item = list.find(item => item.key == key);
  if (!item) throw new Error(`Item for key ${key} not found.`);
  return item;
}

function buy(tractKey: string, userKey: string, amount: number) {
  const tract = byKey(store.tracts, tractKey);
  if (amount > tract.available) return false;
  let item = tract.inventory.find(item => item.owner == userKey);
  if (item) { item.amount += amount; }
  else {
    tract.inventory.push({ owner: userKey, amount });
  }
  tract.available -= amount;
  return true;
}
function sell(tractKey: string, userKey: string, amount: number) {
  const tract = byKey(store.tracts, tractKey);
  let item = tract.inventory.find(item => item.owner == userKey);
  if (!item) return false;
  if (amount > item.amount) return false;
  item.amount -= amount;
  tract.available += amount;
  if (item.amount <= 0.0001) tract.inventory.splice(tract.inventory.indexOf(item), 1);
  return true;
}

function findFirst(id: string) {
  console.log('findFirst', id);
  for (const source of [store.tracts, store.properties, store.banks]) {
    const entity = source.find(entity => entity.key == id);
    console.log('find', id, 'in', source, entity);
    if (entity) return entity;
  }
  console.log('x');
  return undefined;
}

const service: Service = {
  findEntity: (id) => findFirst(id),
  listProperties: () => store.properties,
  listTracts: () => store.tracts,
  listBanks: () => store.banks,
  tractDetails: (key) => byKey(store.tracts, key),
  bankDetails: (key) => byKey(store.banks, key),
  buy: (pk, tk, uk, amount) => buy(tk, uk, amount),
  sell: (pk, tk, uk, amount) => sell(tk, uk, amount),
};

export default service;