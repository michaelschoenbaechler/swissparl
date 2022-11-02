# Swiss Parlament API

A typed javascript library for easy access to the [swiss parlament](https://www.parlament.ch) open data webservices.

Metadata: https://ws.parlament.ch/odata.svc/$metadata

### Install

`npm install swissparl`

### Usage

```typescript
import { queryCollection, Collection, Session, Voting } from "swissparl";

queryCollection<Session>(Collection.Session, {
  filter: [{ Language: "DE", ID: XXXX }],
  expand: ["Votes", "Meetings"],
})
  .then((result) => {
    console.log("Sessions", result);
  })
  .catch((err) => console.error(err));

queryCollection<Voting>(Collection.Voting, {
  filter: [{ Language: "DE", PersonNumber: XXXX }],
  skip: 50,
  top: 50,
})
  .then((result) => {
    console.log("Votings", result);
  })
  .catch((err) => console.error(err));

queryCollection<Voting>("Voting", {
  filter: [{ Language: "DE", ID: XXXX }, { ID: YYYY }],
  select: ["BillTitle", "DecisionText"],
})
  .then((result) => {
    console.log("Votings", result);
  })
  .catch((err) => console.error(err));
```

### Todo

- Support full ODataQueryParam interface
- Override url
