$(document).ready(function() {
var csvData;
                  d3.csv("data/bengals_history.csv", function(error, data) {
                    data.forEach(function(d) {
                      d.BengalsWins = +d.Bengals_Wins;
                      d.year = +d.Year;
                      d.Opts = (33- (+d.OffenseRank));
                      d.Dpts = (33- (+d.DefenseRank));
                  });
              csvData = data;
                console.log(csvData);

  nv.addGraph(function() {
  var chart = nv.models.lineChart()
                .margin({left: 100})  //Adjust chart margins to give the x-axis some breathing room.
                .useInteractiveGuideline(true)  //We want nice looking tooltips and a guideline!
                .transitionDuration(350)  //how fast do you want the lines to transition?
                .showLegend(true)       //Show the legend, allowing users to turn on/off line series.
                .showYAxis(true)        //Show the y-axis
                .showXAxis(true)        //Show the x-axis
  ;

  chart.xAxis     //Chart x-axis settings
      .axisLabel('Year')

  chart.yAxis     //Chart y-axis settings
      .axisLabel('Wins')

  /* Done setting the chart up? Time to render it!*/
  var myData = nvData();
   //You need data...

  d3.select('#graph svg')    //Select the <svg> element you want to render the chart in.
      .datum(myData)         //Populate the <svg> element with chart data...
      .call(chart);          //Finally, render the chart!

  //Update the chart when window resizes.
  nv.utils.windowResize(function() { chart.update() });
  return chart;
});
})

  function nvData () {
var wins = [], OffRank = [];

  //Data is represented as an array of {x,y} pairs.
  for (var i = 0; i < csvData.length; i++) {
    wins.push({x: csvData[i].year, y: csvData[i].BengalsWins});
    OffRank.push({x: csvData[i].year, y: csvData[i].Opts});
  }

  //Line chart data should be sent as an array of series objects.
  return [
    {
      values: wins,      //values - represents the array of {x,y} data points
      key: 'Bengals Wins', //key  - the name of the series.
      color: '#ff7f0e'  //color - optional: choose your own line color.
    },
    {
      values: OffRank,
      key: 'Offense Ranking',
      color: '#2ca02c'
    },
  ];
    console.log(wins);
}
})
