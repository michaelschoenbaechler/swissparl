# Swiss Parlament API

A javascript library for interacting with the swiss parlament open data webservices

### Install

`npm install swissparl`

### Usage

```typescript
import { queryCollection, Collection, Person, Party } from "swissparl";

queryCollection<Person>(Collection.Person, {
  filter: { Language: "DE", LastName: "Müller" },
})
  .then((result) => {
    console.log(result);
  })
  .catch((err) => console.error(err));

queryCollection<Party>(Collection.Party, {
  filter: { Language: "DE", PartyAbbreviation: "SP" },
  expand: "MembersParty",
})
  .then((result) => {
    console.log(result);
  })
  .catch((err) => console.error(err));
```
