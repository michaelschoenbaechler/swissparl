import { OData, ODataFilter, PlainODataMultiResponse } from "@odata/client";
import { Collection, SwissParlEntity } from "./models";

const serviceUrl = "https://ws.parlament.ch/odata.svc/$metadata";
const client = OData.New({
  metadataUri: serviceUrl,
});

const MAX_RESULTS = 1000;

interface QueryOptions<T extends SwissParlEntity> {
  filter?: T[];
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

function createFilter<T>(filterOptions: T[]): ODataFilter {
  const filter = client.newFilter();
  filterOptions.forEach((filterProperties) => {
    for (const key in filterProperties) {
      const value = filterProperties[key] as string;
      filter.property(key).eq(value);
    }
  });
  return filter;
}

function parseRespone<T>(response: PlainODataMultiResponse<T>): T[] {
  return response.d?.results !== undefined
    ? (response.d.results as T[])
    : (response.d as any);
}

function deepParseResponse<T>(
  response: PlainODataMultiResponse<T>,
  expandProperties: Array<keyof T>
): T[] {
  const entities = parseRespone(response);
  return entities.map((entity) => {
    expandProperties.forEach((key) => {
      entity[key] = (entity[key] as any)?.results ?? entity[key];
    });
    return entity;
  });
}

export async function queryCollection<T extends SwissParlEntity>(
  collection: keyof typeof Collection,
  options: QueryOptions<T>,
  config?: Config
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
    options.top !== undefined ? options.top : config?.maxResults ?? MAX_RESULTS
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
    if (config?.deepParse && options.expand !== undefined) {
      return deepParseResponse(oData, options.expand);
    }

    return parseRespone(oData);
  } catch (e) {
    console.error("parse failed", e);
  }
  return [];
}
