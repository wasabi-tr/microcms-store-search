import { MicroCMSContentId } from 'microcms-js-sdk'
import { client } from '@/lib/microcms'
import CategoryCheckBox from './CategoryCheckBox'
import KeyWord from './KeyWord'
import PrefectureSelect from './PrefectureSelect'

type Categories = {
  title: string
} & MicroCMSContentId

type Prefectures = {
  name: string
  code: number
  lat: number
  lng: number
} & MicroCMSContentId

const PREFECTURES_LIMIT = 47

const getCategories = async () => {
  return await client.getList<Categories>({
    endpoint: 'categories'
  })
}
const getPrefectures = async () => {
  return await client.getList<Prefectures>({
    endpoint: 'prefectures',
    queries: { orders: 'code', limit: PREFECTURES_LIMIT }
  })
}

const Search = async () => {
  const [{ contents: prefectures }, { contents: categories }] = await Promise.all([getPrefectures(), getCategories()])
  return (
    <section className="h-full w-full border-r border-gray-200 p-8">
      <div className="grid gap-8">
        <h2 className="text-lg font-bold">店舗検索</h2>
        <PrefectureSelect prefectures={prefectures} />
        <KeyWord />
        <CategoryCheckBox categories={categories} />
      </div>
    </section>
  )
}

export default Search
