import { OData } from '@odata/client'

const serviceUrl = 'https://ws.parlament.ch/odata.svc/$metadata'
const client = OData.New({
  metadataUri: serviceUrl
})

export function languageFilter (lang: string) {
  return client.newFilter().property('Language').eq(lang)
}

export async function getPerson () {
  return await client.newRequest({
    collection: 'Person',
    params: client.newParam().filter(languageFilter('DE'))
  })
}

// TEST
const runner = async () => {
  const person = await getPerson()
  console.log(person)
}

runner().catch((err) => console.log(err))