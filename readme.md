# Swiss Parlament API

A typed javascript library for easy access to the [swiss parlament](https://www.parlament.ch) open data webservices.

Metadata: https://ws.parlament.ch/odata.svc/$metadata

### Install

`npm install swissparl`

### Usage

Query relationships with expand option

```typescript
import { queryCollection, Collection, Session } from "swissparl";

queryCollection<Session>(Collection.Session, {
  filter: [{ ID: XXXX }],
  expand: ["Votes", "Meetings"],
})
  .then((result) => {
    console.log("Sessions", result);
  })
  .catch((err) => console.error(err));
```

Support for pagination with skip and top property

```typescript
import { queryCollection, Collection, Voting } from "swissparl";

queryCollection<Voting>(Collection.Voting, {
  filter: [{ PersonNumber: XXXX }],
  skip: 50,
  top: 50,
})
  .then((result) => {
    console.log("Votings", result);
  })
  .catch((err) => console.error(err));
```

Filter multiple entities (all properties result in logical OR).

```typescript
import { queryCollection, Voting } from "swissparl";

queryCollection<Voting>("Voting", {
  filter: [{ Language: "DE", ID: XXXX }, { ID: YYYY }],
})
  .then((result) => {
    console.log("Votings", result);
  })
  .catch((err) => console.error(err));
```

Reduce size of result by selecting only required properties

```typescript
import { queryCollection, Voting } from "swissparl";

queryCollection<Voting>("Voting", {
  filter: [{ ID: XXXX }],
  select: ["BillTitle", "DecisionText"],
})
  .then((result) => {
    console.log("Votings", result);
  })
  .catch((err) => console.error(err));
```

### Interface

QueryOptions

```typescript
interface QueryOptions<T extends SwissParlEntity> {
  filter?: T[];
  expand?: Array<keyof T>; // only navigation properties
  select?: Array<keyof T>;
  skip?: number;
  top?: number;
}
```
