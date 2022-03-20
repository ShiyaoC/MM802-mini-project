import React, { useState, useRef, useEffect } from 'react';
import DatePicker from "./components/DatePicker"
import Menu from './components/Menu'
import TopN from './components/TopN'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { GoogleMap, withScriptjs, withGoogleMap} from "react-google-maps";
import axios from 'axios'
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
  const [queryResult, setQueryResult] = useState({});

  const [testData, setTestData] = useState([{}]);

  // this is an example data for bar chart
  const [data] = useState([200,20,50,240,120,250,300]);
  const svgRef = useRef();

  const handleClick = async () =>{
    let res = await axios.post('http://localhost:3003/api/', {
      startDate: selectedStartDate,
      endDate: selectedEndDate,
      type: value,
      topn: parseInt(topN)
    })
    // console.log(res)
    setQueryResult(res)
    console.log(queryResult)

  }


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

  // send data from backend to frontend
  useEffect(()=>{
    axios.get('http://localhost:3003/members').then(response => {
      console.log("SUCCESS", response)
      setTestData(response)
    }).catch(error => {
      console.log(error)
    })

  }, [])

  return (
    <div className="App">
      <h1>
        MM802 mini project
      </h1>
      {/* {(typeof testData.data.members === 'undefined') ? (
        <p>loading...</p>
      ) : (
        testData.data.members.map((member,i) => (
          <p key={i}>{member}</p>
        ))
      )}  */}


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

        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleClick}>
          Search
        </Button>
      </Grid>

      {/* {(typeof queryResult.data.Month === 'undefined') ? 
        (<p>
          no data
        </p>):
        (
        <p>showing data</p>
        // <svg ref = {svgRef}/>
      )} */}

      <div style = {{width:'100vw',height:'100vh',marginTop: 40}} >
        <Grid >
          <WrappedMap 
              googleMapURL = {'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places'} 
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `400px` }} />}
              mapElement={<div style={{ height: `100%` }} />}
            />
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
