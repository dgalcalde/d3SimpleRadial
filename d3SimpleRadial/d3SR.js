
/*
 * d3 component, using the d3ComponentBase
 *
 * Author: David González Alcalde
 * Version: 1.0
 * Description: Radial Chart
 *
 */

 var d3SR =  D3ComponentBase.extend({

    defaultWidth: 600,
    defaultHeight: 400,

    render: function(data) {

        var datasetD3 = [];

	/*
	   Datasource format: One column and n rows.
	   DataFixed format: Array of positive numbers.
	*/

        if(!this.dataFixed){
            _.each(data.resultset, function(row) {
        	    		datasetD3.push(row);
            });
        } else {
            datasetD3 = Dashboards.getParam(this.dataFixed);
        }

        var total = 0;
        var grey = 0;

        for (i in datasetD3)
        {
            total = total + datasetD3[i];
        }

        if(!this.percent){
            grey = 100 - total;
            datasetD3.push(grey);
        }

        var dataset = {
          apples: datasetD3,
        };

        var unit = this.unit;

        var width = (this.width) ? this.width : this.chartDefinition.width,
            height = (this.width) ? this.width : this.chartDefinition.width,
            radius = Math.min(width, height) / 2;

        var fontSize;

        var color = d3.scale.category20();
        var colors = (this.colors != null && this.colors.length > 0 ? this.colors : ["red", "yellow", "green"])

        var pie = d3.layout.pie()
            .sort(null);

        var arc = d3.svg.arc()
            //.innerRadius(radius - 25)
            .innerRadius(radius - 10 - this.thickness)
            //.outerRadius(radius - 20);
            .outerRadius(radius - 10);

        d3.select("#"+this.htmlObject).select("svg").remove();

        var svg = d3.select("#"+this.htmlObject).append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("width", width)
            .attr("height", height)
            .attr("class","component")
            .attr("transform", "translate(" + width/2 + "," + height/2 + ")");

        var path = svg.selectAll("path")
            .data(pie(dataset.apples))
          .enter().append("path")
            .attr("fill", function(d, i) { return colors[i]; })
            .attr("d", arc);

        if (width > 150)
            fontSize = 26;
        else if (width > 100)
            fontSize = 22;
        else
            fontSize = 16;

        svg.append("g").attr("class", "labels");
        svg.append("text")
            .attr("class","label")
            .attr("y",10)
            .attr("x",0)
            .attr("cursor","pointer")
            .attr("width",width)
            .attr("text-anchor", "middle")
            .text(function (d) {
                return (unit) ? total + "" + unit : total;
            })
            .style("font-size",fontSize+"px");

    }

 });
