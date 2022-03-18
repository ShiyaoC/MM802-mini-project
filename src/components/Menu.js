import React, {useState} from 'react'
import {Select, MenuItem, FormControl, InputLabel,makeStyles} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    formControl:{
        minWidth: 200
    }
}));

export default function Menu({setValue}) {
  const classes = useStyles();

  const handleChange = e => setValue(e.target.value);

  return (
    <FormControl className={classes.formControl}>
        <InputLabel>Crime Type</InputLabel>
        <Select onChange={handleChange}>
            <MenuItem value = "Assult">Assult</MenuItem>
            <MenuItem value = "Break and Enter">Break and Enter</MenuItem>
            <MenuItem value = "Homicide">Homicide</MenuItem>
            <MenuItem value = "Robbery">Robbery</MenuItem>
            <MenuItem value = "Sexual Assults">Sexual Assults</MenuItem>
            <MenuItem value = "Theft From Vehicle">Theft From Vehicle</MenuItem>
            <MenuItem value = "Theft Of Vehicle">Theft Of Vehicle</MenuItem>
            <MenuItem value = "Theft Over $5000">Theft Over $5000</MenuItem>
        </Select>
    </FormControl>

  )
}

