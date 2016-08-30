//Width and height
var margin = {top: 10, right: 20, bottom: 10, left: 20};
var width = 900 - margin.left - margin.right;
var height = 500 - margin.top - margin.bottom;
var radius = 100;

//
var generator = d3.randomUniform(0, 1);

//
var dataset = [
    [20],
    [30],
    [50]
];

function updateDataset(){
    var newDataset = [];
    var left = 100;
	console.log("new");
    var numPoints = dataset.length;
    for(var i = 0 ; i < numPoints; ++i){
		var x = left * generator();
		console.log(x);
		left -= x;
		newDataset.push([x]);
    }

    dataset = newDataset;
}

function renderDataset(){
    //
    var xScale = d3.scaleLinear()
        .domain([0, d3.max(dataset, function(d) { return d[0]; })])
        .range([0, width]);

	var color = ["red", "green", "blue"];

	var arc = d3.arc()
		.innerRadius(0)
		.outerRadius(radius);

	var pie = d3.pie()
		.value(function(d) {return d;});

	var selection = svg.selectAll("path").data(pie(dataset));

  selection.exit().remove();

	selection
		.enter()
		.append("path")
		.attr("d", arc)
		.attr("fill", function(d,i) {
			return color[i];
		})
		.attr("transform", "translate(300,300)");

	selection
  .transition()
  //.duration(1000)
  .attr("d", arc)
  .attr("fill", function(d,i) {
    return color[i];
  });
}

function init(){
    //create clickable paragraph
    d3.select("body")
	.append("p")
	.text("Go Pie!")
	.on("click", function() {
	    updateDataset();
	    renderDataset();
	});

    //Create SVG element
    var svg = d3.select("body")
	.append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    return svg;
}

//
var svg = init();
