import {
  OData,
  ODataFilter,
  PlainODataMultiResponse,
  type FilterValue,
} from "@odata/client";
import { Collection, SwissParlEntity } from "./models";

const serviceUrl = "https://ws.parlament.ch/odata.svc/$metadata";
const client = OData.New({
  metadataUri: serviceUrl,
});

const MAX_RESULTS = 1000;

type FilterOptions<T> =
  | { eq: Array<Partial<T>> }
  | { ne: Array<Partial<T>> }
  | { gt: Array<Partial<T>> }
  | { lt: Array<Partial<T>> }
  | { ge: Array<Partial<T>> }
  | { le: Array<Partial<T>> }
  | { substringOf: Array<Partial<T>> };

interface QueryOptions<T extends SwissParlEntity> {
  filter?: FilterOptions<T>;
  expand?: Array<keyof T>;
  select?: Array<keyof T>;
  skip?: number;
  top?: number;
  orderby?: {
    property: keyof T;
    order?: "asc" | "desc";
  };
}

interface Config {
  deepParse?: boolean;
  maxResults?: number;
}

function createFilter<T>(filterOptions: FilterOptions<T>): ODataFilter {
  const filter = client.newFilter();
  const substringFilter: string[] = [];
  Object.entries(filterOptions).forEach(([operator, properties]) => {
    properties.forEach((entity) => {
      Object.entries(entity).forEach(([key, value]) => {
        if (operator === "substringOf") {
          substringFilter.push(`substringof('${value}', ${key})`);
        } else {
          const propertyExpr = filter.property(key as keyof T);
          const filterValue = value as FilterValue;
          switch (operator) {
            case "eq":
              propertyExpr.eq(filterValue);
              break;
            case "ne":
              propertyExpr.ne(filterValue);
              break;
            case "gt":
              propertyExpr.gt(filterValue);
              break;
            case "lt":
              propertyExpr.lt(filterValue);
              break;
            case "ge":
              propertyExpr.ge(filterValue);
              break;
            case "le":
              propertyExpr.le(filterValue);
              break;
            default:
              break;
          }
        }
      });
    });
  });

  if (substringFilter.length > 0) {
    filter.property("(" + substringFilter.join(" or ") + ")").eq(true);
  }
  return filter;
}

function parseResponse<T>(response: PlainODataMultiResponse<T>): T[] {
  return response.d?.results !== undefined
    ? response.d.results
    : ((response.d as unknown as T[]) ?? []);
}

function hasNestedResults(value: unknown): value is { results?: unknown } {
  return typeof value === "object" && value !== null && "results" in value;
}

function deepParseResponse<T>(
  response: PlainODataMultiResponse<T>,
  expandProperties: Array<keyof T>,
): T[] {
  const entities = parseResponse(response);
  return entities.map((entity) => {
    expandProperties.forEach((key) => {
      const propertyValue = entity[key];
      if (
        hasNestedResults(propertyValue) &&
        propertyValue.results !== undefined
      ) {
        entity[key] = propertyValue.results as T[typeof key];
      }
    });
    return entity;
  });
}

export async function fetchCollection<T extends SwissParlEntity>(
  collection: keyof typeof Collection,
  options: QueryOptions<T>,
  config?: Config,
): Promise<T[]> {
  const params = client.newParam();
  if (options.filter !== undefined) {
    params.filter(createFilter<T>(options.filter));
  }

  if (options.expand !== undefined) {
    options.expand.forEach((e) => params.expand(e));
  }

  if (options.select !== undefined) {
    options.select.forEach((s) => params.select(s));
  }

  if (options.skip !== undefined) {
    params.skip(options.skip);
  }

  params.top(
    options.top !== undefined
      ? options.top
      : (config?.maxResults ?? MAX_RESULTS),
  );

  if (options.orderby !== undefined) {
    params.orderby(options.orderby.property, options.orderby?.order ?? "asc");
  }

  params.format("json");

  const oData: PlainODataMultiResponse<T> = await client.newRequest<T>({
    collection,
    params,
  });

  if (oData.d === undefined) {
    return [];
  }

  try {
    if (config?.deepParse !== undefined && options.expand !== undefined) {
      return deepParseResponse(oData, options.expand);
    }

    return parseResponse(oData);
  } catch (e) {
    console.error("parse failed", e);
  }
  return [];
}
