import * as React from "react"
import PropTypes from "prop-types"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Typography from "@mui/material/Typography"
import { CardActionArea } from "@mui/material"

export default function ActionAreaCard(props) {
  const { location, food, id } = props
  const { meals } = food

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={meals[id]?.strMealThumb}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {location}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {`Specialty: ${meals[id]?.strMeal}`}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

ActionAreaCard.propTypes = {
  location: PropTypes.string,
  meals: PropTypes.array,
  id: PropTypes.number,
}