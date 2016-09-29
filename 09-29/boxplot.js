var v1 = [[1,2,3,4,4,5,6], [1,1,2,2,3,3,3,3,4,5]];
var v2 = [[1,2,3,4,4,5,6], [10,20,30,40]];

var s = d3.select("#boxes");

var boxWidth = 20;
var x = 50;
var xGrowth = 60;
var margin = 20;

var maxData = 0;
var minData = 100;

var yScale;

function plotbox(values) {
	var list = [];
	x = 50;
	for(var it in values) {
		var data = makeData(values[it]);
		list.push(data);
		
		maxData = Math.max(maxData, list[it].maximum);
		minData = Math.min(minData, list[it].minimum);
	}
	console.log(list);
	
	//clear all
	d3.select("#axis").remove();
	/*d3.selectAll(".minimum").remove();
	d3.selectAll(".maximum").remove();
	d3.selectAll(".minimum").remove();
	d3.selectAll(".minimum").remove();*/
	
	//start plot
	
	yScale = d3.scaleLinear().domain([minData, maxData]).range([0,400]);
	yScaleReverted = d3.scaleLinear().domain([minData, maxData]).range([400,0]);
	
	var yAxis = d3.axisRight().scale(yScaleReverted);
	d3.select("svg")
	.append("g")
	.attr("id", "axis")
	.attr("transform", "translate(0,80)")
	.call(yAxis);
	
	//plotting
	
	//MINIMUM
	s.selectAll(".minimum").data(list).enter()
	.append("line")
	.attr("id", ".minimum")
	.attr("x1", function(d) { return d.xStart; })
	.attr("y1", function(d) { return yScale(d.minimum) + margin; })
	.attr("x2", function(d) { return d.xEnd; })
	.attr("y2", function(d) { return yScale(d.minimum) + margin;})
	.attr("stroke", "black")
	.attr("stroke-width", 2);
	
	//MAXIMUM
	s.selectAll(".maximum").data(list).enter()
	.append("line")
	.attr("id", ".maximum")
	.attr("x1", function(d) { return d.xStart; })
	.attr("y1", function(d) { return yScale(d.maximum) + margin; })
	.attr("x2", function(d) { return d.xEnd; })
	.attr("y2", function(d) { return yScale(d.maximum) + margin;})
	.attr("stroke", "black")
	.attr("stroke-width", 2);
	
	//BOX
	s.selectAll(".box").data(list).enter()
	.append("rect")
	.attr("x", function(d) { return d.xStart; })
	.attr("y", function(d) { return yScale(d.firstQuartile) + margin;})
	.attr("width", boxWidth)
	.attr("height", function(d) { return yScale(d.thirdQuartile) - yScale(d.firstQuartile); })
	.attr("stroke", "black")
	.attr("stroke-width", 2)
	.attr("fill", "none");
	
	//MEDIAN
	s.selectAll(".median").data(list).enter()
	.append("line")
	.attr("id", ".median")
	.attr("x1", function(d) { return d.xStart; })
	.attr("y1", function(d) { return yScale(d.median) + margin; })
	.attr("x2", function(d) { return d.xEnd; })
	.attr("y2", function(d) { return yScale(d.median) + margin;})
	.attr("stroke", "red")
	.attr("stroke-width", 2);
	
	//dotted lines
	s.selectAll(".bottomDotted").data(list).enter()
	.append("line")
	.attr("id", ".bottomDotted")
	.attr("x1", function(d) { return d.xStart + (boxWidth/2.0); })
	.attr("y1", function(d) { return yScale(d.minimum) + margin; })
	.attr("x2", function(d) { return d.xStart + (boxWidth/2.0); })
	.attr("y2", function(d) { return yScale(d.firstQuartile) + margin;})
	.attr("stroke", "black")
	.attr("stroke-dasharray", "5,5")
	.attr("stroke-width", 2);
	
	s.selectAll(".topDotted").data(list).enter()
	.append("line")
	.attr("id", ".topDotted")
	.attr("x1", function(d) { return d.xStart + (boxWidth/2.0); })
	.attr("y1", function(d) { return yScale(d.thirdQuartile) + margin; })
	.attr("x2", function(d) { return d.xStart + (boxWidth/2.0); })
	.attr("y2", function(d) { return yScale(d.maximum) + margin;})
	.attr("stroke", "black")
	.attr("stroke-dasharray", "5,5")
	.attr("stroke-width", 2);
	
	//TRANSITIONS
	
	//MINIMUM
	s.selectAll(".minimum").data(list).transition()
	.attr("id", ".minimum")
	.attr("x1", function(d) { return d.xStart; })
	.attr("y1", function(d) { return yScale(d.minimum) + margin; })
	.attr("x2", function(d) { return d.xEnd; })
	.attr("y2", function(d) { return yScale(d.minimum) + margin;})
	.attr("stroke", "black")
	.attr("stroke-width", 2);
	
	//MAXIMUM
	s.selectAll(".maximum").data(list).transition()
	.attr("id", ".maximum")
	.attr("x1", function(d) { return d.xStart; })
	.attr("y1", function(d) { return yScale(d.maximum) + margin; })
	.attr("x2", function(d) { return d.xEnd; })
	.attr("y2", function(d) { return yScale(d.maximum) + margin;})
	.attr("stroke", "black")
	.attr("stroke-width", 2);
	
	//BOX
	s.selectAll(".box").data(list).transition()
	.attr("x", function(d) { return d.xStart; })
	.attr("y", function(d) { return yScale(d.firstQuartile) + margin;})
	.attr("width", boxWidth)
	.attr("height", function(d) { return yScale(d.thirdQuartile) - yScale(d.firstQuartile); })
	.attr("stroke", "black")
	.attr("stroke-width", 2)
	.attr("fill", "none");
	
	//MEDIAN
	s.selectAll(".median").data(list).transition()
	.attr("id", ".median")
	.attr("x1", function(d) { return d.xStart; })
	.attr("y1", function(d) { return yScale(d.median) + margin; })
	.attr("x2", function(d) { return d.xEnd; })
	.attr("y2", function(d) { return yScale(d.median) + margin;})
	.attr("stroke", "red")
	.attr("stroke-width", 2);
	
	//dotted lines
	s.selectAll(".bottomDotted").data(list).transition()
	.attr("id", ".bottomDotted")
	.attr("x1", function(d) { return d.xStart + (boxWidth/2.0); })
	.attr("y1", function(d) { return yScale(d.minimum) + margin; })
	.attr("x2", function(d) { return d.xStart + (boxWidth/2.0); })
	.attr("y2", function(d) { return yScale(d.firstQuartile) + margin;})
	.attr("stroke", "black")
	.attr("stroke-dasharray", "5,5")
	.attr("stroke-width", 2);
	
	s.selectAll(".topDotted").data(list).transition()
	.attr("id", ".topDotted")
	.attr("x1", function(d) { return d.xStart + (boxWidth/2.0); })
	.attr("y1", function(d) { return yScale(d.thirdQuartile) + margin; })
	.attr("x2", function(d) { return d.xStart + (boxWidth/2.0); })
	.attr("y2", function(d) { return yScale(d.maximum) + margin;})
	.attr("stroke", "black")
	.attr("stroke-dasharray", "5,5")
	.attr("stroke-width", 2);
	
}

function makeData(info) {
	
	var sorted = info.sort();
	var size = sorted.length;
	var median;
	if((size/2)%2)
		median = sorted[Math.floor(size/2.0)];
	else 
		median = (sorted[(size/2) - 1] + sorted[size/2]) / 2.0;
	var minimum = d3.min(sorted);
	var maximum = d3.max(sorted);
	var firstQuartile = sorted[Math.floor(size/4)];
	var thirdQuartile = sorted[Math.floor(3*size/4)];
	var data = {
		"median": median,
		"minimum": minimum,
		"maximum": maximum,
		"firstQuartile": firstQuartile,
		"thirdQuartile": thirdQuartile,
		"xStart": x,
		"xEnd": x + boxWidth
	};
	x += xGrowth;
	return data;
}

function init() {
	plotbox(v1);
}

function change() {
	plotbox(v2);
}

init();