# Swiss Parlament API

A typed javascript library for easy access to the [swiss parlament](https://www.parlament.ch) open data webservices.

Metadata: https://ws.parlament.ch/odata.svc/$metadata

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
