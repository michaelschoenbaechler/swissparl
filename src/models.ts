export enum Collection {
  Person = "Person",
  Party = "Party",
  MemberParty = "MemberParty",
}

export interface SwissParlEntity {
  ID?: string;
  Language?: string;
}

export interface Person extends SwissParlEntity {
  NumberOfChildren?: number;
}

export interface Party extends SwissParlEntity {
  PartyAbbreviation?: string;
}

export interface MemberParty extends SwissParlEntity {
  PartyAbbreviation?: string;
}
