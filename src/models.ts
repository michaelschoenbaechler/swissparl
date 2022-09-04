export enum Collection {
  Person = "Person",
}

export interface SwissParlEntity {
  ID?: string;
}

export interface Person extends SwissParlEntity {
  Language?: string;
  NumberOfChildren?: number;
}
