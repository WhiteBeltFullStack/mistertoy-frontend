import { GoogleMap, Marker, useJsApiLoader, InfoWindow } from '@react-google-maps/api'
import { useState, useCallback } from 'react'

export function GoogleMaps() {
  const containerStyle = {
    width: '60vw',
    height: '60vh',
    margin: '0 auto',
  }

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyBn7HsroJXyV01tw7bmrnxmUQf8Hc-Zoas',
  })

  const [map, setMap] = useState(null)
  const [center, setCenter] = useState({
    lat: 32.0853,
    lng: 34.7818,
  })
  const [markers, setMarkers] = useState([])
  const [selectedMarker, setSelectedMarker] = useState(null)

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center)
    map.fitBounds(bounds)

    setMap(map)
  }, [])

  const onUnmount = useCallback(function callback(map) {
    setMap(null)
  }, [])

  function onCenter(ev) {
    console.log('ev:', ev)
    const lat = ev.latLng.lat()
    const lng = ev.latLng.lng()

    if (map) map.panTo({ lat, lng })
    const geoCoder = new window.google.maps.Geocoder()
    geoCoder.geocode({ location: { lat, lng } }, (results, status) => {
        if (status === 'OK' && results[0]) {
          const address = results[0].formatted_address
          const newMarker = { lat, lng, address }
          setMarkers(prevMarkers => [...prevMarkers, newMarker])
          setSelectedMarker(newMarker)
        } else {
          console.error('Geocode failed due to:', status)
          // 🔒 Prevent setting empty marker
          // (Don't set selectedMarker or add it to list)
        }
    })

  }

  function onMarkerClick(marker) {
    console.log('marker:', marker)
    if (map) map.panTo({ lat: marker.lat, lng: marker.lng })
    setSelectedMarker(marker)
  }

  function onClickAdress() {
    setSelectedMarker
  }

  function onDeleteMarker(MarkerToDelete) {
    setMarkers(prevMarkers => prevMarkers.filter(marker => marker !== MarkerToDelete))
    setSelectedMarker(null)
  }

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={11}
      onLoad={onLoad}
      onUnmount={onUnmount}
      onClick={(ev) => {
        if (ev.placeId) {
          ev.stop()
          return
        }
    
        // 📍 This is the call
        onCenter(ev)
      }}
    >
      {/* Child components, such as markers, info windows, etc. */}
      {markers.map((marker, idx) => (
        <Marker onClick={() => onMarkerClick(marker)} key={idx} position={marker} />
      ))}

      {selectedMarker && (
        <InfoWindow
          position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
          onCloseClick={() => setSelectedMarker(null)}
        >
          <div onClick={onClickAdress}>
            {selectedMarker.address}
            <button
              onClick={() => {
                onDeleteMarker(selectedMarker)
              }}
            >
              Remove Marker
            </button>
          </div>
        </InfoWindow>
      )}

      <></>
    </GoogleMap>
  ) : (
    <></>
  )
}
