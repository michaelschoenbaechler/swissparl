import { OData, ODataFilter } from "@odata/client";
import { Collection, SwissParlEntity } from "./models";

const serviceUrl = "https://ws.parlament.ch/odata.svc/$metadata";
const client = OData.New({
  metadataUri: serviceUrl,
});

interface RequestOptions<T extends SwissParlEntity> {
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

export async function queryCollection<T extends SwissParlEntity>(
  collection: keyof typeof Collection,
  options: RequestOptions<T>
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

  if (options.top !== undefined) {
    params.top(options.top);
  }

  if (options.orderby !== undefined) {
    params.orderby(options.orderby.property, options.orderby?.order ?? 'asc');
  }

  params.format("json");

  const entities: any = await client.newRequest<T>({
    collection,
    params,
  });

  if (entities.d === undefined) {
    return [];
  }

  return entities.d?.results !== undefined
    ? (entities.d.results as T[])
    : (entities.d as T[]);
}
