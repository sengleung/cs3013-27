/* Author: @ullly Ultan O Morain, Student No. 15315653 */

var source = "https://www.scss.tcd.ie/Stephen.Barrett/webhooks/software-analytics/tp.php"; // client dummy data

var vertSlot = 1; 
var day1 = [];
var day2 = [];
var day3 = [];
var day4 = [];
var day5 = [];
var day6 = [];
var day7 = [];
var edges1 = [];
var edges2 = [];
var edges3 = [];
var edges4 = [];
var edges5 = [];
var edges6 = [];
var edges7 = [];
var svg1;
var svg2;
var svg3;
var svg3;
var svg4;
var svg5;
var svg6;
var svg7;

var converter = function(d) {
	return {
		name: d.name,
		size: parseInt(d.size),
		type: d.type,
		date: d.date,
		user: d.user,
		category: d.category
	};
}

load();
function load() {
	d3.csv(source, converter, function(error, data) {
		if(error) {
			console.log("bummer");
		}else {
			dataset = data;
			parse();
			update();
		}
	}); 
}

function update() {
	d3.select("#update")
		.on("click", function() {
			day1 = [];
			day2 = [];
			day3 = [];
			day4 = [];
			day5 = [];
			day6 = [];
			day7 = [];
			edges1 = [];
			edges2 = [];
			edges3 = [];
			edges4 = [];
			edges5 = [];
			edges6 = [];
			edges7 = [];
			d3.selectAll("svg").remove().transition();
			var selection = document.getElementById("selecteduser");
			var selected = selection.options[selection.selectedIndex].value;
			if(selected ==  "opt2") {
				source = "data/data1.csv"; // local dummy data
				load();
			}else if(selected == "opt1") {
				source = "https://www.scss.tcd.ie/Stephen.Barrett/webhooks/software-analytics/tp.php";
				load();
			}
		});
}

function parse() {
	var currentDate = dataset[0].date;
	var previousDate = dataset[0].date;
	var count = 0;
	var day = 1;
	for(var i = 0; i < dataset.length; i++) {
		currentDate = dataset[i].date;	
		if(currentDate == previousDate) {
			makeNodes(dataset[i], day);
			count++;
		} else {
			// draw the current day
			makeEdges(count, day);
			makeGraph(day);
			vertSlot++;
			// reset for going to the next day 
			previousDate = currentDate;
			count = 0;
			day++;
			i--;
		}
	}
}

function makeNodes(data, day) {
	switch(day) {
		case 1:
			day1.push(data);
			break;
		case 2:
			day2.push(data);
			break;
		case 3:
			day3.push(data);
			break;
		case 4:
			day4.push(data);
			break;
		case 5:
			day5.push(data);
			break;
		case 6:
			day6.push(data);
			break;
		case 7:
			day7.push(data);
			break;
		default: 
	}
}

function makeEdges(number, day) {
	for(var i = 0; i < number; i++) {	
		var edg = {};
		if(i + 1 != number) {
			edg = {source: i, target:i+1};		
		}else {
			edg = {source: i, target:i-2};		
		}
		switch(day) {
			case 1:
				edges1.push(edg);
				break;
			case 2:
				edges2.push(edg);
				break;
			case 3:
				edges3.push(edg);
				break;
			case 4:
				edges4.push(edg);
				break;
			case 5:
				edges5.push(edg);
				break;
			case 6:
				edges6.push(edg);
				break;
			case 7:
				edges7.push(edg);
				break;
			default:
		}
	}
}

function makeGraph(day) {
	var w = 100;
	var h = 100;
	switch(day) {
		case 1: 
			d3.select("#graph").append("div")
				.html("<div id='day1' class='two columns'></div>");
			svg1 = d3.select("#day1").append("svg"); 
			svg1.attr("width", w);
			svg1.attr("height", h);
			graph(day1, edges1, svg1);
			break;
		case 2: 
			d3.select("#graph").append("div")
				.html("<div id='day2' class='two columns'></div>");
			svg2 = d3.select("#day2").append("svg"); 
			svg2.attr("width", w);
			svg2.attr("height", h);
			graph(day2, edges2, svg2);
			break;
		case 3: 
			d3.select("#graph").append("div")
				.html("<div id='day3' class='two columns'></div>");
			svg3 = d3.select("#day3").append("svg"); 
			svg3.attr("width", w);
			svg3.attr("height", h);
			graph(day3, edges3, svg3);
			break;
		case 4: 
			d3.select("#graph").append("div")
				.html("<div id='day4' class='two columns'></div>");
			svg4 = d3.select("#day4").append("svg"); 
			svg4.attr("width", w);
			svg4.attr("height", h);
			graph(day4, edges4, svg4);
			break;
		case 5:  
			d3.select("#graph").append("div")
				.html("<div id='day5' class='two columns'></div>");
			svg5 = d3.select("#day5").append("svg"); 
			svg5.attr("width", w);
			svg5.attr("height", h);
			graph(day5, edges5, svg5);
			break;
		case 6: 
			d3.select("#graph")
				.append("div").html("<div id='day6' class='two columns'></div>");
			svg6 = d3.select("#day6").append("svg"); 
			svg6.attr("width", w);
			svg6.attr("height", h);
			graph(day6, edges6, svg6);
			break;
		case 7: 
			d3.select("#graph")
				.append("div").html("<div id='day7' class='two columns'></div>");
			svg7 = d3.select("#day7").append("svg"); 
			svg7.attr("width", w);
			svg7.attr("height", h);
			graph(day7, edges7, svg7);
			break;
	}	
}

function graph(datasetDay, edges, svg) {
	var force = d3.forceSimulation(datasetDay)
			.force("force", d3.forceManyBody())
			.force("link", d3.forceLink(edges))
			.force("center", d3.forceCenter().x(100/2).y(100/2));
	var edgess = svg.selectAll("line")
			.data(edges)
			.enter()
			.append("line")
			.style("stroke", "#ccc")
			.style("stroke-width", 5);
	var nodescale = d3.scaleLinear();
	nodescale.domain([0, d3.max(datasetDay, 
				function(d) {
					return d.size; 
				})])
			.range([5, 20]);
	var nodes = svg.selectAll("circle")
			.data(datasetDay)
			.enter()
			.append("circle")
			.attr("r", function(d) {
					return nodescale(d.size);
				})
			.style("fill", function(d) {
					if(d.type == "commit") {
						return "#FDB35F";
					} else {
						return "#EDEDED";
					}
				}) 
			.call(d3.drag()
			.on("start", dragStarted)
			.on("drag", dragging)
			.on("end", dragEnded))
			.on("mouseover", function(d) {
					d3.select("#tooltip").classed("hidden", false);
					d3.select("#footer").classed("hidden", false);
					d3.select("#tooltip").select("td#name").transition().text(d.name);
					d3.select("#tooltip").select("td#size").transition().text(d.size);
					d3.select("#tooltip").select("td#type").transition().text(d.type);
					d3.select("#tooltip").select("td#date").transition().text(d.date);
					d3.select("#tooltip").select("td#user").transition().text(d.user);
					d3.select("#tooltip").select("td#category").transition().text(d.category);
				});
	force.on("tick", function() {
			edgess.attr("x1", function(d) { return d.source.x; })
				.attr("y1", function(d) { return d.source.y; })
				.attr("x2", function(d) { return d.source.x; })
				.attr("y2", function(d) { return d.source.y; });
			nodes.attr("cx", function(d) { return d.x; })
				.attr("cy", function(d) { return d.y; });
			});
	function dragStarted(d) {
		if(!d3.event.active) {
			force.alphaTarget(0.3).restart();
		}
		d.fx = d.x;
		d.fy = d.y;
	}
	function dragging(d) {
		d.fx = d3.event.x;
		d.fy = d3.event.y;
	}
	function dragEnded(d) {
		if(!d3.event.active) {
			force.alphaTarget(0);
		}	
		d3.fx = null;
		d3.fy = null;
	}
	return 0;
}
