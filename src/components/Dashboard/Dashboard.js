import React, { useEffect, useState } from 'react'
import { styled } from "@mui/material/styles"
import { Box, Grid, Skeleton } from '@mui/material'
import { useJsApiLoader } from "@react-google-maps/api"
import { Map } from './'

const StyledBox = styled(Box)(() => {
  return {
    width: '100%',
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    background: `linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)`
  }
})

function Dashboard () {
  // const mapRef = useRef()
  const [meals, setMeals] = useState()
  const [error, setError] = useState()
  const googleAPIKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY // modify .env.local file and set MAPS API key
  const center = { lat: 10.316217799457187, lng: 123.88462951395323 }

  const mealsAPI = "https://www.themealdb.com/api/json/v1/1/filter.php?a=British"
  
  const fetchMeals = () => {
    fetch(mealsAPI)
      .then((res) => res.json())
      .then((res) => {
        setMeals(res)
      })
  }

  useEffect(() => {
    try {
      fetchMeals()
    } catch (error) {
      setError(error) 
    }
  }, [])
  
  const { isLoaded } = useJsApiLoader({
    id: "d2e03f299f1b0be3",
    googleMapsApiKey: googleAPIKey,
    libraries: ["places"],
  })

  return (
    <StyledBox>
      <Grid container sx={{ height: '100%' }}>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          {isLoaded && !error ? (
            <Map center={center} meals={meals} />
          ) : (
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
          )}
        </Grid>
      </Grid>
    </StyledBox>
  )
}

export default Dashboard