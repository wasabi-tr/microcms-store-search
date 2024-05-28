import Spinner from '@/app/_components/Spinner'
import getStores from '../_api/getStores'
import Map from './Map'
type Props = {
  q?: string
  area?: string
  categories?: string[]
  currentLat?: string
  currentLng?: string
}
const Results = async ({ q, area, categories, currentLat, currentLng }: Props) => {
  const stores = await getStores({ q, area, categories })

  const markerPositions = stores?.map((store) => {
    return { lat: store.lat, lng: store.lng }
  })

  const center = { lat: Number(currentLat), lng: Number(currentLng) }

  return (
    <div className="flex h-full">
      <section className="h-full w-1/3 overflow-scroll p-8">
        <div className="grid gap-6 ">
          <h2 className="text-lg font-bold">検索結果</h2>
          {stores.length === 0 ? (
            <p className="">検索結果がありません</p>
          ) : (
            <ul className="grid  gap-3 ">
              {stores.map((store) => (
                <li key={store.id} className="grid gap-2 rounded-md border p-4 transition hover:bg-gray-50">
                  <p className="font-bold">{store.name}</p>
                  <p className="text-sm">{store.address}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
      <div className="relative h-full w-2/3">
        <Map positions={markerPositions} center={center} />
      </div>
    </div>
  )
}

export default Results
