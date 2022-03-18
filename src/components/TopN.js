import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    // '& > *': {
      // margin: theme.spacing(1),
      width: '25ch',
    // },
  },
}));

export default function TopN({setTopN}) {
  const classes = useStyles();
//   const handleChange = e => setTopN(e.target.topN);
  const handleChange = e => {
    setTopN(e.target.value);
    console.log(e.target.value);
  };
//   const handleChange = e => setValue(e.target.value);

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField id="standard-basic" label="N Neighbourhoods" onChange={handleChange} />
    </form>
  );
}