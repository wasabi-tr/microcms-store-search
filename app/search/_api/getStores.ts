import { client } from '@/lib/microcms'
import { Queries, Stores } from '@/app/search/types'

const buildFilters = (area?: string, categories?: string[]) => {
  const areaFilter = area ? `prefectures[equals]${area}` : ''
  const categoriesFilter = categories?.length ? `categories[contains]${categories.join(',')}` : ''

  if (areaFilter && categoriesFilter) {
    return `${areaFilter}[and]${categoriesFilter}`
  }
  return areaFilter || categoriesFilter || ''
}

const getStores = async ({ q, area, categories }: Queries) => {
  const filters = buildFilters(area, categories)

  return await client.getAllContents<Stores>({
    endpoint: 'stores',
    queries: { q, filters }
  })
}

export default getStores
