# Swiss Parlament API

A typed JavaScript library designed for easy access to the [swiss parlament](https://www.parlament.ch)  open data web services. Retrieve and manipulate parliamentary data with a user-friendly interface and powerful filtering options.

Metadata: https://ws.parlament.ch/odata.svc/$metadata

## Installation

Install the `swissparl` package using npm:

`npm install swissparl`

## Usage

### Expand 

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

### Pagination

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

### Filter

Flexible filtering options allow you to refine your queries:

- Duplicates across entities result in logical OR (see ID example)
- Multiple operators result in logical AND
- Use substringOf to filter by substring

```typescript
import { queryCollection, Voting } from "swissparl";

queryCollection<Voting>("Voting", {
  filter: {
    eq: [{ Language: "DE", ID: XXXX }, { ID: YYYY }],
    gt: [{ PersonNumber: 5000 }],
    substringOf: [{ "BillTitle": "some substring" }]
  },
})
  .then((result) => {
    console.log("Votings", result);
  })
  .catch((err) => console.error(err));
```

### Select

Optimize your queries by fetching only the necessary properties:

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

## API

### QueryCollection

```typescript
queryCollection<T extends SwissParlEntity>(
    collection: keyof typeof Collection,
    options: QueryOptions<T>,
    config?: Config): Promise<T[]>
```

### QueryOptions

```typescript
type FilterOptions<T> =
  | { eq: T[] }
  | { ne: T[] }
  | { gt: T[] }
  | { lt: T[] }
  | { ge: T[] }
  | { le: T[] };
  | { substringOf: T[] };

interface QueryOptions<T extends SwissParlEntity> {
  filter?: FilterOptions<T>;
  expand?: Array<keyof T>; // only navigation properties
  select?: Array<keyof T>;
  skip?: number;
  top?: number;
  orderby?: {
    property: keyof T;
    order?: "asc" | "desc";
  };
}
```

### Config

```typescript
interface Config {
  deepParse?: boolean; // for expanded objects
  maxResults?: number; // default 1000
}
```
