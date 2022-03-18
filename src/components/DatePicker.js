import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

export default function DatePicker({selectedDate, setSelectedDate, label}) {
  // The first commit of Material-UI
//   const [selectedStartDate, handleDateStartChange] = React.useState(new Date());
//   const [selectedEndDate, handleDateEndChange] = React.useState(new Date());
  const handleDateChange = (date) => {
    setSelectedDate(date);
    console.log(date);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      {/* <Grid container justifyContent="space-around"> */}
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
            clearable
            value={selectedDate}
            label = {label}
            placeholder="10/10/2020"
            onChange={date => handleDateChange(date)}
            maxDate={new Date()}
            format="MM/dd/yyyy"
            />

        </MuiPickersUtilsProvider>
      {/* </Grid> */}
    </MuiPickersUtilsProvider>
  );
}
