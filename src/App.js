import React, { useState } from 'react';
import DatePicker from "./components/DatePicker"
import Menu from './components/Menu'
import Grid from '@material-ui/core/Grid';
import TopN from './components/TopN'


function App() {
  // const [selectedStartDate, handleDateStartChange] = useState(new Date());
  // const [selectedEndDate, handleDateEndChange] = useState(new Date());
  const [selectedStartDate, setSelectedStartDate] = React.useState(new Date());
  const [selectedEndDate, setSelectedEndDate] = React.useState(new Date());

  const [value,setValue] = useState("");
  const [topN,setTopN] = useState("");
  return (
    <div className="App">
      <h1>
        MM802 mini project
      </h1>
      <Grid container justifyContent="space-around">
        <DatePicker 
          setSelectedDate={setSelectedStartDate} 
          selectedDate = {selectedStartDate} 
          label = {"Start Date"}/>
        <DatePicker 
          setSelectedDate={setSelectedEndDate} 
          selectedDate = {selectedEndDate} 
          label = {"End Date"}/>

        <Menu setValue={setValue}/>
        <TopN setTopN={setTopN}/>
      </Grid>
      <p>
          start date: {selectedStartDate.toLocaleString()}
      </p>
      <p>
          end date: {selectedEndDate.toLocaleString()}
      </p>
      <p>
          you selected crime type: {value}
      </p>
      <p>
          N = {topN}
      </p>

    </div>
  );
}

export default App;
