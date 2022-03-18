import React, { useState, useRef, useEffect } from 'react';
import DatePicker from "./components/DatePicker"
import Menu from './components/Menu'
import Grid from '@material-ui/core/Grid';
import TopN from './components/TopN'
import { GoogleMap, withScriptjs, withGoogleMap} from "react-google-maps";
import * as d3 from "d3";
// d3 bar chart: https://www.youtube.com/watch?v=hOzKr8H_438

function Map(){
  return (<GoogleMap defaultZoom={10} defaultCenter={{lat: 53.544388, lng:-113.490929}}/>);
}

const WrappedMap = withScriptjs(withGoogleMap(Map));


function App() {
  const [selectedStartDate, setSelectedStartDate] = React.useState(new Date());
  const [selectedEndDate, setSelectedEndDate] = React.useState(new Date());
  const [value,setValue] = useState("");
  const [topN,setTopN] = useState("");

  const [data] = useState([200,20,50,240,120,250,300]);
  const svgRef = useRef();

  useEffect(() => {
    // setup svg container
    const w = 400;
    const h = 300;
    const svg = d3.select(svgRef.current)
      .attr('width',w)
      .attr('height', h)
      .style('overflow', 'visible')
      .style('margin-top','75px')
      .style('margin-left','75px');


    // set scaling
    const xScale = d3.scaleBand()
      .domain(data.map((val,i) => i))
      .range([0,w])
      .padding(0.5);
    const yScale = d3.scaleLinear()
      .range([h,0])
      .domain([0,h]);

    //set the axes
    const xAxis = d3.axisBottom(xScale)
      .ticks(data.length);
    const yAxis = d3.axisLeft(yScale)
      .ticks(5);

    svg.append('g')
      .attr('transform', `translate(0, ${h})`)
      .call(xAxis);
    svg.append('g').call(yAxis);
    
    // set the svg data
    svg.selectAll('.bar')
      .data(data)
      .join('rect')
        .attr('x',(v,i) => xScale(i))
        .attr('y', yScale)
        .attr('width', xScale.bandwidth)
        .attr('height', val => h - yScale(val));
  } ,[data]);

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
      <p></p>

      <div style = {{width:'100vw',height:'100vh',}}>
        <Grid >
          <WrappedMap 
              googleMapURL = {'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places'} 
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `400px` }} />}
              mapElement={<div style={{ height: `100%` }} />}
            />
          <svg ref = {svgRef}/>
        </Grid>
      </div>
      
      




{/*       
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
      </p> */}

    </div>
  );
}

export default App;
