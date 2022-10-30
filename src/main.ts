import { OData, ODataFilter, PlainODataMultiResponse } from "@odata/client";
import { Collection, SwissParlEntity } from "./models";

const serviceUrl = "https://ws.parlament.ch/odata.svc/$metadata";
const client = OData.New({
  metadataUri: serviceUrl,
});

interface RequestOptions<T extends SwissParlEntity> {
  filter?: T;
  expand?: keyof T;
}

function createFilter<T>(filterProperties: T): ODataFilter {
  const filter = client.newFilter();
  for (const key in filterProperties) {
    const value = filterProperties[key] as string;
    filter.property(key).eq(value);
  }
  return filter;
}

export async function queryCollection<T extends SwissParlEntity>(
  collection: Collection,
  options: RequestOptions<T>
): Promise<T[]> {
  const params = client.newParam();
  if (options.filter !== undefined) {
    params.filter(createFilter<T>(options.filter));
  }

  if (options.expand !== undefined) {
    params.expand(options.expand);
  }

  const entities: PlainODataMultiResponse<T> = await client.newRequest<T>({
    collection,
    params,
  });

  return entities.d != undefined ? entities.d.results : [];
}
