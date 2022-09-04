export enum Collection {
  Person = "Person",
  Party = "Party",
  MemberParty = "MemberParty",
}

export interface SwissParlEntity {
  ID?: string;
}

export interface Person extends SwissParlEntity {
  Language?: string;
  NumberOfChildren?: number;
}

export interface Party extends SwissParlEntity {
  Language?: string;
  PartyAbbreviation?: string;
}

export interface MemberParty extends SwissParlEntity {
  Language?: string;
  PartyAbbreviation?: string;
}
