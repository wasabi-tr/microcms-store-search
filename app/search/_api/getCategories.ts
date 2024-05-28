import { client } from '@/lib/microcms'
import { Categories } from '@/app/search/types'

const getCategories = async () => {
  return await client.getList<Categories>({
    endpoint: 'categories'
  })
}

export default getCategories
