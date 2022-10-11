import * as React from "react"
import PropTypes from "prop-types"
import { Button } from "@mui/material"

export default function MuiButton(props) {
  const { label, handleClick } = props
  return (
    <Button variant="contained" component="label" onClick={handleClick}>
      {label}
    </Button>
  )
}

MuiButton.propTypes = {
  handleClick: PropTypes.func,
  label: PropTypes.string,
}