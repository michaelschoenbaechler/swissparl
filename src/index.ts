import { OData, PlainODataMultiResponse, ODataQueryParam } from "@odata/client";
import { Collection, Person, SwissParlEntity } from "./models";

const serviceUrl = "https://ws.parlament.ch/odata.svc/$metadata";
const client = OData.New({
  metadataUri: serviceUrl,
});

export function createFilterParam<T extends SwissParlEntity>(
  entity: T
): ODataQueryParam {
  const filter = client.newFilter();
  for (const key in entity) {
    const value = entity[key] as string;
    filter.property(key).eq(value);
  }
  return client.newParam().filter(filter);
}

export async function getEntities<T>(
  collection: Collection,
  params: ODataQueryParam
): Promise<T[]> {
  const entities: PlainODataMultiResponse = await client.newRequest<T>({
    collection,
    params,
  });

  return entities.d != null ? entities.d?.results : [];
}

const runner = async (): Promise<void> => {
  const person = await getEntities<Person>(
    Collection.Person,
    createFilterParam<Person>({ Language: "DE", NumberOfChildren: 0 })
  );
  console.log(person);
};

runner().catch((err) => console.error(err));
