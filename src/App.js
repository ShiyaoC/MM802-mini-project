import React, { useState, useRef, useEffect } from 'react';
import DatePicker from "./components/DatePicker"
import Menu from './components/Menu'
import TopN from './components/TopN'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow, Circle} from "react-google-maps";
import axios from 'axios'
import * as d3 from "d3";
import { red } from '@material-ui/core/colors';
import { count } from 'd3';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
// import Map from "./components/WrappedMap"
// d3 bar chart: https://www.youtube.com/watch?v=hOzKr8H_438


// var data = {"Month":{"0":1,"1":2,"2":3,"3":4,"4":5,"5":6,"6":7,"7":8,"8":9,"9":10,"10":11,"11":12},"count":{"0":1137,"1":918,"2":977,"3":1146,"4":1360,"5":1357,"6":1295,"7":1149,"8":1083,"9":1213,"10":1065,"11":973}};


function App() {
  const [selectedStartDate, setSelectedStartDate] = React.useState(new Date());
  const [selectedEndDate, setSelectedEndDate] = React.useState(new Date());
  const [value,setValue] = useState("");
  const [topN,setTopN] = useState("");
  const [queryResult, setQueryResult] = useState({});
  const [selectedNeighbourhood, setSelectedNeighbourhood] = useState(null);
  const [testData, setTestData] = useState([{}]);
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState({"Month":{"0":1,"1":2,"2":3,"3":4,"4":5,"5":6,"6":7,"7":8,"8":9,"9":10,"10":11,"11":12},"count":{"0":0,"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0,"10":0,"11":0}}
  );

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = async () =>{
    let res = await axios.post('http://localhost:3003/api/', {
      startDate: selectedStartDate,
      endDate: selectedEndDate,
      type: value,
      topn: parseInt(topN)
    })
    // console.log(res)
    setQueryResult(res)
    // console.log(queryResult)

    setData(res.data);
    console.log("data update!")
    console.log(queryResult.data)
    console.log(data)
  
  }


    
  function Map(){
    console.log(queryResult)
    if (queryResult.data == undefined || queryResult.data.Month != undefined) {
      console.log("undefined!!!")
      return (<GoogleMap defaultZoom={10} defaultCenter={{lat: 53.544388, lng:-113.490929}}/>)
    }
    // console.log(typeof queryResult.data[0].ratio)

    return (<GoogleMap defaultZoom={10} defaultCenter={{lat: 53.544388, lng:-113.490929}}>
      {/* {queryResult.data.map(neighbourhood => (
          <Marker
            position={{
              lat: neighbourhood.Latitude,
              lng: neighbourhood.Longitude
            }}
            onClick={() => {
              setSelectedNeighbourhood(neighbourhood);
            }}
          />
        ))} */}
        {selectedNeighbourhood && (
          <InfoWindow
            onCloseClick={() => {
              setSelectedNeighbourhood(null);
            }}
            position={{
              lat: selectedNeighbourhood.Latitude,
              lng: selectedNeighbourhood.Longitude
            }}
          >
            <div>
              <h2>{selectedNeighbourhood.Neighbourhood}</h2>
              <p>{typeof selectedNeighbourhood.ratio == 'undefined' ? 
              <>{
                <p>total crime count: {selectedNeighbourhood.Count}</p>
              }
              </>
                : 
                <>{
                  <p>Most frequent crime: {selectedNeighbourhood.type}</p>
                }</>
                }</p>
            </div>
          </InfoWindow>
        )}
        {queryResult.data.map(neighbourhood => (
          <Circle
            defaultCenter={{
              lat: neighbourhood.Latitude,
              lng: neighbourhood.Longitude
            }}
            radius={typeof neighbourhood.ratio == 'undefined' ? neighbourhood.Count : neighbourhood.ratio*5000}
            onClick={() => {
              setSelectedNeighbourhood(neighbourhood);
            }}
          />
        ))}

    </GoogleMap>);
  }

  const WrappedMap = withScriptjs(withGoogleMap(Map));
  
  const svgRef = useRef();

  useEffect(() => {
    if (data.Month != undefined){ 

    const xtry = [];
    for(let i =0; i < Object.keys(data.Month).length;i++){
      xtry.push(data.count[i]);
    }
    const ydata = xtry;
    const width = 800;
    const height = 300;
    const svg = d3.select(svgRef.current)
      .attr('width',width)
      .attr('height', height)
      .style('overflow', 'visible')
      .style('margin-top','75px')
      .style('margin-left','75px');
    
    svg.selectAll("*").remove()

    svg.append("text")
      .attr("transform", "translate(100,0)")
      .attr("x", width/4)
      .attr("y", 50)
      .attr("font-size", "24px")
      .text("Crime in Neighbourhood by Months")

    // set scaling
    var xScale = d3.scaleBand().range([0, width]).padding(0.4),
        yScale = d3.scaleLinear().range([height, 0]);

    var g = svg.append("g")
        .attr("transform", "translate(" + 100 + "," + 100 + ")");

  
      xScale.domain(ydata.map((val,i) => i));
      yScale.domain([0, d3.max(ydata)]);

      g.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(xScale).tickFormat(function(d){return d+1;}))
      .append("text")
      .attr("y", height - 250)
      .attr("x", width/2)
      .attr("text-anchor", "end")
      .attr("stroke", "black")
      .text("Month");

      g.append("g")
         .call(d3.axisLeft(yScale).tickFormat(function(d){
             return d;
         })
         .ticks(15))
         .append("text")
         .attr("transform", "rotate(-90)")
         .attr("x",0-height/4)
         .attr("dy", "-5.1em")
         .attr("text-anchor", "end")
         .attr("stroke", "black")
         .text("Amount of Crime");

        g.selectAll(".bar")
         .data(ydata)
         .enter().append("rect")
         .attr("class", "bar")
         .attr("x", (v,i) => xScale(i))
         .attr("y", yScale)
         .attr("width", xScale.bandwidth())
         .attr("height", val => height - yScale(val));
  }} ,[data]);

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


      <div style = {{width:'100vw',height:'50vh',marginTop: 40}} >
        <Grid >
          <WrappedMap 
              googleMapURL = {'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyDviHOxXfm0fv1fbQ3gT0GF81moFw99an4'} 
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `400px` }} />}
              mapElement={<div style={{ height: `100%` }} />}
            />
        </Grid>
      </div>

      <div style = {{width:'100vw',height:'80vh',marginTop: 20, marginBottom: 20}} >
        { (typeof queryResult.data === 'undefined') ? 
          <p>no chart</p> :
          <>
          {
            typeof queryResult.data.Month === 'undefined' 
            ? <p>No data for bar chart</p> 
            : <> 
              <p> showing bar chart </p>,
              <svg ref = {svgRef}/>
            </>
          }
          </>
        }

        {/* <p> retrieve: {JSON.stringify(queryResult.data) } </p> */}
      </div>
    </div>
  );
}

export default App;
