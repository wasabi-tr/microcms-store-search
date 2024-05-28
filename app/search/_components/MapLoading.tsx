import Spinner from '@/app/_components/Spinner'

const MapLoading = () => {
  return (
    <div className="absolute inset-0 z-20 flex h-full w-full items-center justify-center bg-black opacity-30">
      <Spinner />
    </div>
  )
}

export default MapLoading
