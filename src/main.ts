import {
  OData,
  ODataFilter,
  PlainODataMultiResponse,
  type FilterValue,
} from "@odata/client";
import type {
  CollectionName,
  EntityProperty,
  FetchConfig,
  FilterComparisonOperator,
  FilterCriteria,
  FilterOptions,
  QueryOptions,
  SwissParlEntity,
} from "./types";

const SERVICE_URL = "https://ws.parlament.ch/odata.svc/$metadata";
const DEFAULT_MAX_RESULTS = 1000;

const client = createODataClient(SERVICE_URL);

type QueryParamBuilder = ReturnType<typeof client.newParam>;

const COMPARISON_OPERATORS: FilterComparisonOperator[] = [
  "eq",
  "ne",
  "gt",
  "lt",
  "ge",
  "le",
];

/**
 * Creates a configured instance of the OData client.
 */
function createODataClient(metadataUri: string) {
  return OData.New({ metadataUri });
}

/**
 * Builds the filter query for the OData request.
 */
function createFilter<T extends SwissParlEntity>(
  filterOptions: FilterOptions<T>,
): ODataFilter {
  const filter = client.newFilter();

  COMPARISON_OPERATORS.forEach((operator) => {
    const clauses = filterOptions[operator];
    if (clauses !== undefined) {
      applyFilterClauses(filter, operator, clauses);
    }
  });

  appendSubstringConditions(
    filter,
    buildSubstringConditions(filterOptions.substringOf),
  );

  return filter;
}

/**
 * Applies comparison operators to the shared filter instance.
 */
function applyFilterClauses<T extends SwissParlEntity>(
  filter: ODataFilter,
  operator: FilterComparisonOperator,
  clauses: FilterCriteria<T>[],
) {
  clauses.forEach((criteria) => {
    Object.entries(criteria).forEach(([property, value]) => {
      if (value === undefined || value === null) {
        return;
      }
      applyComparisonOperator(
        filter,
        operator,
        property as EntityProperty<T>,
        value as FilterValue,
      );
    });
  });
}

/**
 * Applies a single comparison clause to the filter.
 */
function applyComparisonOperator<T extends SwissParlEntity>(
  filter: ODataFilter,
  operator: FilterComparisonOperator,
  property: EntityProperty<T>,
  value: FilterValue,
) {
  const propertyExpression = filter.property(property as string);

  switch (operator) {
    case "eq":
      propertyExpression.eq(value);
      break;
    case "ne":
      propertyExpression.ne(value);
      break;
    case "gt":
      propertyExpression.gt(value);
      break;
    case "lt":
      propertyExpression.lt(value);
      break;
    case "ge":
      propertyExpression.ge(value);
      break;
    case "le":
      propertyExpression.le(value);
      break;
    default:
      break;
  }
}

/**
 * Builds substring filters that must be concatenated manually.
 */
function buildSubstringConditions<T extends SwissParlEntity>(
  clauses: FilterCriteria<T>[] | undefined,
): string[] {
  if (clauses === undefined) {
    return [];
  }

  const conditions: string[] = [];

  clauses.forEach((criteria) => {
    Object.entries(criteria).forEach(([property, value]) => {
      if (value === undefined || value === null) {
        return;
      }
      conditions.push(
        `substringof('${sanitizeSubstringValue(value)}', ${String(property)})`,
      );
    });
  });

  return conditions;
}

/**
 * Escapes values that are interpolated into substring filters.
 */
function sanitizeSubstringValue(value: unknown): string {
  return String(value).replace(/'/g, "''");
}

/**
 * Adds substring filters to the main filter.
 */
function appendSubstringConditions(filter: ODataFilter, conditions: string[]) {
  if (conditions.length === 0) {
    return;
  }

  filter.property(`(${conditions.join(" or ")})`).eq(true);
}

/**
 * Builds the query parameters for an OData request.
 */
function createQueryParams<T extends SwissParlEntity>(
  options: QueryOptions<T>,
  config?: FetchConfig,
): QueryParamBuilder {
  const params = client.newParam();

  applyFilterOption(params, options.filter);
  applyExpandOption(params, options.expand);
  applySelectOption(params, options.select);
  applySkipOption(params, options.skip);
  applyTopOption(params, options.top, config?.maxResults);
  applyOrderByOption(params, options.orderby);

  params.format("json");

  return params;
}

/**
 * Applies filter options if present.
 */
function applyFilterOption<T extends SwissParlEntity>(
  params: QueryParamBuilder,
  filterOptions?: FilterOptions<T>,
) {
  if (filterOptions === undefined) {
    return;
  }

  params.filter(createFilter(filterOptions));
}

/**
 * Applies expand options if present.
 */
function applyExpandOption<T extends SwissParlEntity>(
  params: QueryParamBuilder,
  expand?: EntityProperty<T>[],
) {
  expand?.forEach((property) => params.expand(property as string));
}

/**
 * Applies select options if present.
 */
function applySelectOption<T extends SwissParlEntity>(
  params: QueryParamBuilder,
  select?: EntityProperty<T>[],
) {
  select?.forEach((property) => params.select(property as string));
}

/**
 * Applies the skip option if present.
 */
function applySkipOption(params: QueryParamBuilder, skip?: number) {
  if (typeof skip === "number" && skip > 0) {
    params.skip(skip);
  }
}

/**
 * Applies the top option with fallback logic.
 */
function applyTopOption(
  params: QueryParamBuilder,
  top: number | undefined,
  maxResults: number | undefined,
) {
  params.top(determineTopValue(top, maxResults));
}

/**
 * Resolves the effective top value that should be used in the query.
 */
function determineTopValue(
  top: number | undefined,
  maxResults: number | undefined,
): number {
  if (typeof top === "number") {
    return top;
  }

  if (typeof maxResults === "number") {
    return maxResults;
  }

  return DEFAULT_MAX_RESULTS;
}

/**
 * Applies ordering if present.
 */
function applyOrderByOption<T extends SwissParlEntity>(
  params: QueryParamBuilder,
  orderby?: QueryOptions<T>["orderby"],
) {
  if (orderby === undefined) {
    return;
  }

  params.orderby(orderby.property as string, orderby.order ?? "asc");
}

/**
 * Executes the request against the SwissParl OData service.
 */
async function executeCollectionRequest<T extends SwissParlEntity>(
  collection: CollectionName,
  params: QueryParamBuilder,
): Promise<PlainODataMultiResponse<T>> {
  return client.newRequest<T>({ collection, params });
}

/**
 * Parses the OData payload into a flat array of entities.
 */
function parseResponse<T>(response: PlainODataMultiResponse<T>): T[] {
  if (response.d?.results !== undefined) {
    return response.d.results;
  }

  return (response.d as unknown as T[]) ?? [];
}

/**
 * Identifies nested result containers returned by expanded properties.
 */
function hasNestedResults(value: unknown): value is { results?: unknown } {
  return typeof value === "object" && value !== null && "results" in value;
}

/**
 * Normalises expanded properties that contain nested result arrays.
 */
function normalizeExpandedProperty(value: unknown): unknown[] | undefined {
  if (hasNestedResults(value) && Array.isArray(value.results)) {
    return value.results;
  }

  return undefined;
}

/**
 * Deeply parses expanded relationships when requested.
 */
function deepParseResponse<T extends SwissParlEntity>(
  response: PlainODataMultiResponse<T>,
  expandProperties: EntityProperty<T>[],
): T[] {
  return parseResponse(response).map((entity) => {
    const flattened = { ...entity };

    expandProperties.forEach((property) => {
      const nested = normalizeExpandedProperty(flattened[property]);
      if (nested !== undefined) {
        flattened[property] = nested as T[typeof property];
      }
    });

    return flattened;
  });
}

/**
 * Determines whether deep parsing should be applied.
 */
function shouldDeepParse<T extends SwissParlEntity>(
  options: QueryOptions<T>,
  config?: FetchConfig,
): options is QueryOptions<T> & { expand: EntityProperty<T>[] } {
  return Boolean(config?.deepParse && options.expand?.length);
}

/**
 * Fetches a SwissParl collection, returning the entities that match the given options.
 */
export async function fetchCollection<T extends SwissParlEntity>(
  collection: CollectionName,
  options: QueryOptions<T>,
  config?: FetchConfig,
): Promise<T[]> {
  const params = createQueryParams(options, config);
  const oData = await executeCollectionRequest<T>(collection, params);

  if (oData.d === undefined) {
    return [];
  }

  try {
    if (shouldDeepParse(options, config)) {
      return deepParseResponse(oData, options.expand);
    }

    return parseResponse(oData);
  } catch (error) {
    console.error("parse failed", error);
    return [];
  }
}
