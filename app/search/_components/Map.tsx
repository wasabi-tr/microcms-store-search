'use client'
import { FC, memo } from 'react'
import { GoogleMap, MarkerF, useJsApiLoader } from '@react-google-maps/api'
import MapLoading from './MapLoading'

type Props = {
  zoom?: number
  positions?: { lat: number; lng: number }[] | []
  center?: { lat: number; lng: number }
}
const mapContainerStyle = { height: '100%', width: '100%' }
const Map = ({ zoom = 9, positions, center }: Props) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY!
  })
  return isLoaded ? (
    <GoogleMap center={center} zoom={zoom} mapContainerStyle={mapContainerStyle}>
      {positions &&
        positions.length > 0 &&
        positions.map((position, index) => <MarkerF key={index} position={position} />)}
    </GoogleMap>
  ) : (
    <MapLoading />
  )
}

export default memo(Map)
