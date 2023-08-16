type HasKey = {
  key: string;
}

type HasName = {
  name: string;
}

type Entity = HasKey & HasName;

type GeoLocation = [lat: number, lng: number];

type User = Entity & {

}

type Property = Entity & {
  geolocation: GeoLocation;
  // TODO add tracts
}

type InventoryItem = {
  owner: string;
  amount: number;
}

type Inventory = Array<InventoryItem>;

type Tract = Entity & {
  area: number; // square meters
  geolocation: GeoLocation;
  bank: string;
  available: number;
  inventory: Inventory;
}

type Bank = Entity & {

}

