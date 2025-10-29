# Swiss Parlament API

A typed JavaScript library designed for easy access to the [swiss parlament](https://www.parlament.ch) open data web services. Retrieve and manipulate parliamentary data with a user-friendly interface and powerful filtering options.

Metadata: https://ws.parlament.ch/odata.svc/$metadata

## Installation

Install the `swissparl` package using npm:

`npm install swissparl`

## Usage

### Expand

Query relationships with expand option

```typescript
import { fetchCollection, Collection, type Session } from "swissparl";

fetchCollection<Session>(Collection.Session, {
  filter: { eq: [{ ID: XXXX }] },
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
import { fetchCollection, Collection, type Voting } from "swissparl";

fetchCollection<Voting>(Collection.Voting, {
  filter: { eq: [{ PersonNumber: XXXX }] },
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
- Use substringOf to filter by substring. Multiple substringOf filters always result in logical OR

```typescript
import { fetchCollection, Collection, type Voting } from "swissparl";

fetchCollection<Voting>(Collection.Voting, {
  filter: {
    eq: [{ Language: "DE", ID: XXXX }, { ID: YYYY }],
    gt: [{ PersonNumber: 5000 }],
    substringOf: [{ BillTitle: "some substring", Subject: "some substring" }],
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
import { fetchCollection, Collection, type Voting } from "swissparl";

fetchCollection<Voting>(Collection.Voting, {
  filter: { eq: [{ ID: XXXX }] },
  select: ["BillTitle", "DecisionText"],
})
  .then((result) => {
    console.log("Votings", result);
  })
  .catch((err) => console.error(err));
```

## API

All runtime helpers and types are exported from the package entry point:

```typescript
import {
  fetchCollection,
  Collection,
  type CollectionName,
  type FetchConfig,
  type FilterOptions,
  type QueryOptions,
  type SwissParlEntity,
} from "swissparl";
```

### `fetchCollection`

```typescript
fetchCollection<T extends SwissParlEntity>(
  collection: CollectionName,
  options: QueryOptions<T>,
  config?: FetchConfig,
): Promise<T[]>
```

### `QueryOptions`

```typescript
type FilterCriteria<T> = Partial<Record<keyof T, unknown>>;

type FilterOptions<T> = Partial<{
  eq: FilterCriteria<T>[];
  ne: FilterCriteria<T>[];
  gt: FilterCriteria<T>[];
  lt: FilterCriteria<T>[];
  ge: FilterCriteria<T>[];
  le: FilterCriteria<T>[];
  substringOf: FilterCriteria<T>[];
}>;

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

### `FetchConfig`

```typescript
interface FetchConfig {
  deepParse?: boolean; // flattens expanded collections
  maxResults?: number; // default 1000
}
```
