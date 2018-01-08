
var engaged = 50;
var notEngaged = 35;
var maybeEngaged = 15;

var engagedYuzdelik = (100*engaged)/(engaged+notEngaged+maybeEngaged);
var notEngagedYuzdelik = (100*notEngaged)/(engaged+notEngaged+maybeEngaged);
var maybeEngagedYuzdelik=(100*maybeEngaged)/(engaged+notEngaged+maybeEngaged);

var dataset = [
{ name: 'Engaged', percent: [engagedYuzdelik.toFixed(2)] },
{ name: 'Not Engaged', percent: [notEngagedYuzdelik.toFixed(2)] },
{ name: 'Maybe Not Engaged', percent: [maybeEngagedYuzdelik.toFixed(2)]},
];

var pie=d3.layout.pie()
.value(function(d){return d.percent})
.sort(null);

var w=300,h=300;

var radius = Math.min(w, h) / 2;

var outerRadius=w/2;
var innerRadius=100;

 var arc=d3.svg.arc()
             .outerRadius(radius - 60)
             .innerRadius(radius - 50);
var thinArc = d3.svg.arc()
.outerRadius(radius - 60)
.innerRadius(radius - 50),
thickArc = d3.svg.arc()
.outerRadius(radius - 65)
.innerRadius(radius - 45);


var svg=d3.select("#chart")
.append("svg")
.attr({
	width:w,
	height:h,
	class:'shadow'
}).append('g')
.attr({
	transform:'translate('+w/2+','+h/2+')'
});
var defs = svg.append("svg:defs")

var engagedGradient = defs.append("svg:linearGradient")
.attr("id", "engagedGradient")
.attr("x1", "30%")
.attr("y1", "30%")
.attr("x2", "70%")
.attr("y2", "70%")
.attr("spreadMethod", "pad");

engagedGradient.append("svg:stop")
.attr("offset", "0%")
.attr("stop-color", "#00e9ff")
.attr("stop-opacity", 1);

engagedGradient.append("svg:stop")
.attr("offset", "100%")
.attr("stop-color", "#51f586")
.attr("stop-opacity", 1);

var notEngagedGradient = defs.append("svg:linearGradient")
.attr("id", "notEngagedGradient")
.attr("x1", "30%")
.attr("y1", "30%")
.attr("x2", "70%")
.attr("y2", "70%")
.attr("spreadMethod", "pad");

notEngagedGradient.append("svg:stop")
.attr("offset", "0%")
.attr("stop-color", "#ff0084")
.attr("stop-opacity", 1);

notEngagedGradient.append("svg:stop")
.attr("offset", "100%")
.attr("stop-color", "#ffb400")
.attr("stop-opacity", 1);


var maybeEngagedGradient = defs.append("svg:linearGradient")
.attr("id", "maybeEngagedGradient")
.attr("x1", "30%")
.attr("y1", "30%")
.attr("x2", "70%")
.attr("y2", "70%")
.attr("spreadMethod", "pad");

maybeEngagedGradient.append("svg:stop")
.attr("offset", "0%")
.attr("stop-color", "#fff095")
.attr("stop-opacity", 1);

maybeEngagedGradient.append("svg:stop")
.attr("offset", "100%")
.attr("stop-color", "#ffeb66")
.attr("stop-opacity", 1);



var path=svg.selectAll('path')
.data(pie(dataset))
.enter()
.append('path')
.style("fill", function (d) {
	if (d.data.name === "Engaged") {
		return "url(#engagedGradient)"
	} else if(d.data.name === "Not Engaged"){
		return "url(#notEngagedGradient)"
	} else if(d.data.name === "Maybe Not Engaged"){
		return "url(#maybeEngagedGradient)"
	}
});

path.transition()
.duration(1000)
.attrTween('d', function(d) {
	var interpolate = d3.interpolate({startAngle: 20, endAngle: 0}, d);            
	return function(t) {
		if (d.data.name === "Engaged"){
			return thickArc(interpolate(t));
		} else {
			return thinArc(interpolate(t));
		}
	};
});


  var restOfTheData=function(){
        var text=svg.selectAll('text')
                .data(pie(dataset))
                .enter()
                .append("text")
                .transition()
                .duration(200)
                .attr("transform", function (d) {
                    var c  = arc.centroid(d);
                    return "translate(" + c[0] +"," + c[1] + ")";
                })
                .attr("dy", ".4em")
                .attr("text-anchor", "middle")
                .text(function(d){
                    return d.data.percent+"%";
                })
                .style({
                    fill:'#f49b42',
                    'font-size':'20px'
                });

	

	
	legend.append('rect')
	.attr({
		width:20,
		height:7,
		rx:20,
		ry:20
	})
	.style({
		fill:color,
		stroke:color
	});


};


setTimeout(restOfTheData,1000);