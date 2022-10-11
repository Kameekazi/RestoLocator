/*global google*/
import React, { useState } from "react"
import { Box, Grid } from "@mui/material"
import { ActionAreaCard } from "../MUIComponents"
import MuiButton from "../MUIComponents/DirectionsButton"
import { useRef } from "react"
import {
  GoogleMap,
  StandaloneSearchBox,
  Marker,
  InfoWindow,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api"
function Map(props) {
  const [info, setInfo] = useState(false)
  const [currentLocation, setCurrentLocation] = useState()
  const [searchBox, setSearchBox] = useState()
  const [locations, setLocations] = useState()
  const [directionResponse, setDirectionResponse] = useState()
  const [destination, setDestination] = useState()
  const originRef = useRef()
  const { center, meals } = props
  const onLoad = (data) => {
    setSearchBox(data)
  }
  const onPlacesChanged = () => {
    setLocations(searchBox.getPlaces())
  }
  const onMapLoad = (map) => {
    // enable this to get current users location
    // navigator?.geolocation.getCurrentPosition(
    //   ({ coords: { latitude: lat, longitude: lng } }) => {
    //     const pos = { lat, lng }
    //     setCurrentLocation({ currentLocation: pos })
    //   }
    // )
    google.maps.event.addListener(map, "bounds_changed", () => {
      setCurrentLocation({ bounds: map.getBounds() })
    })
  }
  const getDirections = async () => {
    const originVal = originRef.current.value
    
    if (originVal === "" || destination === "") {
      return
    }
    const directionService = new google.maps.DirectionsService()
    const results = await directionService.route({
      origin: originVal,
      destination: destination,
      travelMode: google.maps.TravelMode.DRIVING,
    })
    setDirectionResponse(results)
  }

  console.log("info: ", info)
  console.log("locations: ", locations)
  return (
    <GoogleMap
      mapContainerStyle={{ width: "100%", height: "100%" }}
      center={center}
      zoom={14}
      options={{
        mapId: "d2e03f299f1b0be3",
        disableDefaultUI: true,
        clickableIcons: false,
      }}
      onLoad={(map) => onMapLoad(map)}
    >
      {directionResponse && (
        <DirectionsRenderer directions={directionResponse} />
      )}
      {locations?.map((location, index) => {
        const id = index > 57 ? index - 57 : index + 2
        let marker = null
        return (
          <Marker
            onLoad={(data) => (marker = data)}
            key={index}
            position={location.geometry.location}
            onClick={(data) => {
              setInfo({ ...info, ...location, mealId: id, marker: marker })
              setDestination(`${location.name} ${location.formatted_address}`)
            }}
          />
        )
      })}
      {info && (
        <InfoWindow anchor={info.marker} position={info?.geometry.location}>
          <ActionAreaCard location={info.name} food={meals} id={info.mealId} />
        </InfoWindow>
      )}
      <Box>
        <Grid container direction="column" rowSpacing={7}>
          <Grid item>
            <Autocomplete>
              <input
                placeholder="Set Origin"
                ref={originRef}
                style={{
                  boxSizing: `border-box`,
                  border: `1px solid transparent`,
                  width: `240px`,
                  height: `32px`,
                  padding: `0 12px`,
                  borderRadius: `3px`,
                  boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                  fontSize: `14px`,
                  outline: `none`,
                  textOverflow: `ellipses`,
                  position: "absolute",
                  left: "50%",
                  insetInlineStart: "auto",
                  marginTop: "10px",
                  marginLeft: "10px",
                }}
              />
            </Autocomplete>
          </Grid>
          <Grid item>
            <StandaloneSearchBox
              onLoad={onLoad}
              onPlacesChanged={onPlacesChanged}
              bounds={currentLocation?.bounds}
            >
              <input
                placeholder="Search Map(e.g. Restaurants)"
                style={{
                  boxSizing: `border-box`,
                  border: `1px solid transparent`,
                  width: `240px`,
                  height: `32px`,
                  padding: `0 12px`,
                  borderRadius: `3px`,
                  boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                  fontSize: `14px`,
                  outline: `none`,
                  textOverflow: `ellipses`,
                  position: "absolute",
                  left: "50%",
                  insetInlineStart: "auto",
                  marginLeft: "10px",
                }}
              />
            </StandaloneSearchBox>
          </Grid>
          <Grid item xs={3} sm={3} md={3} lg={3} marginLeft={1} marginTop={-1}>
            <MuiButton label="Get Directions" handleClick={getDirections} />
          </Grid>
        </Grid>
      </Box>
    </GoogleMap>
  )
}
export default Map
