type HasKey = {
  key: string;
}

type HasName = {
  name: string;
}

type GeoLocation = [lat: number, lng: number];

type User = HasKey & HasName & {

}

type Property = HasKey & HasName & {
  geolocation: GeoLocation;
}

type InventoryItem = {
  owner: string;
  amount: number;
}

type Inventory = Array<InventoryItem>;

type Tract = HasKey & HasName & {
  area: number; // square meters
  geolocation: GeoLocation;
  bank: string;
  available: number;
  inventory: Inventory;
}

type Bank = HasKey & HasName & {

}

