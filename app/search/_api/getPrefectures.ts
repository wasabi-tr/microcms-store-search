import { client } from '@/lib/microcms'
import { Prefectures } from '@/app/search/types'

const PREFECTURES_LIMIT = 47
const getPrefectures = async () => {
  return await client.getList<Prefectures>({
    endpoint: 'prefectures',
    queries: { orders: 'code', limit: PREFECTURES_LIMIT }
  })
}

export default getPrefectures
