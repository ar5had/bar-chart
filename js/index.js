// JSON url
var url = "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json";

// Setting margin
var margin = {top: 50, bottom: 50, left: 50, right: 50};

// Assigning width and height to vars for svg
var width = 960 - margin.right - margin.left;
var height = 500 - margin.bottom - margin.top;

// Scale for y axis
var y = d3.scaleLinear()
        .range([height, 0]);
// Scale for x axis
var x = d3.scaleBand()
        .range([0, width]);


// Defining x-axis and y-axis
var xaxis = d3.axisBottom(x);
var yaxis = d3.axisLeft(y);

// Improve
// Setting svg element's height
var chart = d3.select("#chart")
  .attr("width", width + margin.right + margin.left)
  .attr("height", height + margin.bottom + margin.top)
.append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")" );

// Sending get request
$.getJSON(url, function(data, status) {
  
  // Unsuccesful get request case
  if(status !== "success") {
    alert("Data fetching failed!");
    return;
  }
  
  // Formatting data
  var formattedData = data["data"].map(function(elem) {
    return {x: elem[0], y: elem[1]}; 
  });
  
  // Setting Domain
  y.domain([0, d3.max(formattedData.map(function(e){return e.y;}))]);
  x.domain(formattedData.map(function(e){return e.x}));
  
  // Adding x-axis and y-axis
  chart.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xaxis);

  chart.append("g")
    .attr("class", "y axis")
    .call(yaxis);
  
  // Appending g for each data element and translating it 
  var bar = chart.selectAll("g")
    .data(formattedData)  
    .enter()
  .append("g")
    .attr("transform", function(d, i) { return "translate(" + x(d.x) + ", 0)"; });
  
  // Appending rect to each g which was appended earlier
  bar.append("rect")
    .attr("class", "bar")
    .attr("y", function(d){ return y(d.y);})
    .attr("height", function(d){ return height - y(d.y);})
    .attr("width", x.step());
    
});// getJSON ends



// problems
// x.step() and x.bandwidth()