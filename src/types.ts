import { Collection, SwissParlEntity } from "./models";

/**
 * Extracts the property names of a SwissParl entity that can be used in
 * `expand` or `select` clauses.
 */
export type EntityProperty<T extends SwissParlEntity> = keyof T;

/**
 * A collection name as it appears in the SwissParl OData service.
 */
export type CollectionName = keyof typeof Collection;

/**
 * Operators that can be represented through the OData client's comparison
 * helpers.
 */
export type FilterComparisonOperator = "eq" | "ne" | "gt" | "lt" | "ge" | "le";

/**
 * Operators that require manual string construction.
 */
export type FilterStringOperator = "substringOf";

export type FilterOperator =
  | FilterComparisonOperator
  | FilterStringOperator;

/**
 * Represents a single filter clause for an entity.
 */
export type FilterCriteria<T extends SwissParlEntity> = Partial<
  Record<EntityProperty<T>, unknown>
>;

/**
 * Describes the filter options that can be applied to an entity collection.
 */
export type FilterOptions<T extends SwissParlEntity> = Partial<
  Record<FilterOperator, Array<FilterCriteria<T>>>
>;

/**
 * Ordering options to apply to the query.
 */
export interface OrderByOption<T extends SwissParlEntity> {
  property: EntityProperty<T>;
  order?: "asc" | "desc";
}

/**
 * Options used to build an OData query for a SwissParl collection.
 */
export interface QueryOptions<T extends SwissParlEntity> {
  filter?: FilterOptions<T>;
  expand?: EntityProperty<T>[];
  select?: EntityProperty<T>[];
  skip?: number;
  top?: number;
  orderby?: OrderByOption<T>;
}

/**
 * Runtime configuration flags for fetching a collection.
 */
export interface FetchConfig {
  deepParse?: boolean;
  maxResults?: number;
}

export type { SwissParlEntity };
