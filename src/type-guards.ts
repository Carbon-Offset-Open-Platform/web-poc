export function isTract(tract: any): tract is Tract {
  return (tract as Tract).available !== undefined;
}

export function isProperty(property: any): property is Property {
  return !isTract(property) && (property as Property).geolocation !== undefined;
}

export function isBank(bank: any): bank is Bank {
  return !isProperty(bank) && !isTract(bank);
}

