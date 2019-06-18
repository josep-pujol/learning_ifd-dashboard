// modified version of code found at http://bl.ocks.org/asielen/44ffca2877d0132572cb

export function makeMultiLineChart(dataset, xName, yObjs, axisLabels) {
    var chartObj = {};
    var color = d3.scale.category10();
    chartObj.xAxisLabel = axisLabels.xAxis;
    chartObj.yAxisLabel = axisLabels.yAxis;
    /*
     yObjsects format:
     {y1:{column:'',name:'name',color:'color'},y2}
     */

    chartObj.data = dataset;
    chartObj.margin = {top: 25, right: 90, bottom: 90, left: 110};
    chartObj.width = 1150 - chartObj.margin.left - chartObj.margin.right;
    chartObj.height = 900 - chartObj.margin.top - chartObj.margin.bottom;


// So we can pass the x and y as strings when creating the function
    chartObj.xFunct = function(d){return d[xName];};


// For each yObjs argument, create a yFunction
    function getYFn(column) {
        return function (d) {
            return d[column];
        };
    }


// Object instead of array
    chartObj.yFuncts = [];
    for (var y  in yObjs) {
        yObjs[y].name = y;
        yObjs[y].yFunct = getYFn(yObjs[y].column); //Need this  list for the ymax function
        chartObj.yFuncts.push(yObjs[y].yFunct);
    }


//Formatter functions for the axes
    chartObj.formatAsDate = d3.timeFormat("%d/%m/%Y");
    chartObj.formatAsNumber = d3.format(".0f");
    chartObj.formatAsDecimal = d3.format(".4f");
    chartObj.formatAsCurrency = d3.format("$.4f");
    chartObj.formatAsFloat = function (d) {
        if (d % 1 !== 0) {
            return d3.format(".4f")(d);
        } else {
            return d3.format(".0f")(d);
        }
    };
    chartObj.xFormatter = chartObj.formatAsDate;
    chartObj.yFormatter = chartObj.formatAsFloat;
    chartObj.bisectYear = d3.bisector(chartObj.xFunct).left; //< Can be overridden in definition


//Create scale functions
    chartObj.xScale = d3.scale.linear().range([0, chartObj.width]).domain(d3.extent(chartObj.data, chartObj.xFunct)); //< Can be overridden in definition


// Get the max and min of every yFunct
    chartObj.max = function (fn) {
        return d3.max(chartObj.data, fn);
    };
    chartObj.min = function (fn) {
        return d3.min(chartObj.data, fn);
    };
    var scale_margin = 0.1;
    chartObj.yScale = d3.scale.linear().range([chartObj.height, 0]).domain([d3.min(chartObj.yFuncts.map(chartObj.min)) - scale_margin, 
                                                                            d3.max(chartObj.yFuncts.map(chartObj.max)) + scale_margin]);
    chartObj.formatAsYear = d3.time.format("%d/%m/%Y");


//Create axis
    chartObj.xAxis = d3.svg.axis().scale(chartObj.xScale).orient("bottom").tickFormat(chartObj.xFormatter); //< Can be overridden in definition
    chartObj.yAxis = d3.svg.axis().scale(chartObj.yScale).orient("left").tickFormat(chartObj.yFormatter); //< Can be overridden in definition


// Build line building functions
    function getYScaleFn(yObj) {
        return function (d) {
            return chartObj.yScale(yObjs[yObj].yFunct(d));
        };
    }
    for (var yObj in yObjs) {
        yObjs[yObj].line = d3.svg.line().interpolate("cardinal").x(function (d) {
            return chartObj.xScale(chartObj.xFunct(d));
        }).y(getYScaleFn(yObj));
    }

    chartObj.svg;


// Change chart size according to window size
    chartObj.update_svg_size = function () {
        chartObj.width = parseInt(chartObj.chartDiv.style("width"), 10) - (chartObj.margin.left + chartObj.margin.right);
        chartObj.height = parseInt(chartObj.chartDiv.style("height"), 10) - (chartObj.margin.top + chartObj.margin.bottom);

        /* Update the range of the scale with new width/height */
        chartObj.xScale.range([0, chartObj.width]);
        chartObj.yScale.range([chartObj.height, 0]);

        if (!chartObj.svg) {return false;}

        /* Else Update the axis with the new scale */
        chartObj.svg.select('.x.axis').attr("transform", "translate(0," + chartObj.height + ")").call(chartObj.xAxis);
        chartObj.svg.select('.x.axis .label').attr("x", chartObj.width / 2);
        chartObj.svg.select('.y.axis').call(chartObj.yAxis);
        chartObj.svg.select('.y.axis .label').attr("x", -chartObj.height / 2);

        /* Force D3 to recalculate and update the line */
        for (var y  in yObjs) {
            yObjs[y].path.attr("d", yObjs[y].line);
        }
        

        d3.selectAll(".focus.line").attr("y2", chartObj.height);

        chartObj.chartDiv.select('svg'
                                ).attr("width", chartObj.width + (chartObj.margin.left + chartObj.margin.right)
                                ).attr("height", chartObj.height + (chartObj.margin.top + chartObj.margin.bottom));

        chartObj.svg.select(".overlay").attr("width", chartObj.width).attr("height", chartObj.height);
        return chartObj;
    };

    chartObj.bind = function (selector) {
        chartObj.mainDiv = d3.select(selector);
        
        //Draw Title
        chartObj.mainDiv.append("div").attr("class", "col-12 ml-2 pt-1").append("h4").text("Historical");
        
        // Add all the divs to make it centered and responsive
        chartObj.mainDiv.append("div").attr("class", "inner-wrapper"
                       ).append("div").attr("class", "outer-box"
                       ).append("div").attr("class", "inner-box");
        var chartSelector = selector + " .inner-box";
        chartObj.chartDiv = d3.select(chartSelector);
        d3.select(window).on('resize.' + chartSelector, chartObj.update_svg_size);
        chartObj.update_svg_size();
        return chartObj;
    };


// Render the chart
    chartObj.render = function () {
        //Create SVG element
        chartObj.svg = chartObj.chartDiv.append("svg"
                                        ).attr("class", "chart-area"
                                        ).attr("width", chartObj.width + (chartObj.margin.left + chartObj.margin.right)
                                        ).attr("height", chartObj.height + (chartObj.margin.top + chartObj.margin.bottom)
                                        ).append("g").attr("transform", "translate(" + chartObj.margin.left + "," + chartObj.margin.top + ")");
        

        // Draw Lines
        for (var y  in yObjs) {
            yObjs[y].path = chartObj.svg.append("path"
                                    ).datum(chartObj.data).attr("class", "line"
                                    ).attr("d", yObjs[y].line).style("stroke", color(y)
                                    ).attr("data-series", y).on("mouseover", function () {
                focus.style("display", null);
            }).on("mouseout", function () {
                focus.transition().delay(700).style("display", "none");
            }).on("mousemove", mousemove);
        }
        

        // Draw Axis 
        chartObj.svg.append("g").attr("class", "x axis").attr("transform", "translate(0," + chartObj.height + ")"
                                        ).call(chartObj.xAxis
                                        ).append("text"
                                            ).attr("class", "label"
                                            ).attr("x", chartObj.width / 2
                                            ).attr("y", 80).style("text-anchor", "middle"
                                                          ).style("font-size", "0.9em").text(chartObj.xAxisLabel);
        
        chartObj.svg.selectAll("text").attr("transform", "rotate(25)"  // Rotate date text from axis
                                     ).attr("dx", "2.5em"
                                     ).attr("dy", "1.1em");
                                     
        chartObj.svg.selectAll(".label").attr("transform", "rotate(0)"  // Remove rotation from Axis Label
                                                         ).attr("dx", "0"
                                                         ).attr("dy", "0");


        chartObj.svg.append("g").attr("class", "y axis"
                                        ).call(chartObj.yAxis
                                            ).append("text"
                                            ).attr("class", "label"
                                            ).attr("transform", "rotate(-90)"
                                            ).attr("y", -80
                                            ).attr("x", -chartObj.height / 2
                                            ).attr("dy", ".71em").style("text-anchor", "middle"
                                                                ).style("font-size", "0.9em").text(chartObj.yAxisLabel);


        //Draw tooltips
        var focus = chartObj.svg.append("g").attr("class", "focus").style("display", "none");

        for (var y  in yObjs) {
            yObjs[y].tooltip = focus.append("g");
            yObjs[y].tooltip.append("circle").attr("r", 2);
            yObjs[y].tooltip.append("rect").attr("x", 7).attr("y","-17").attr("width",38).attr("height", "0.8em");
            yObjs[y].tooltip.append("text").attr("x", 9).attr("y","-10").attr("dy", ".35em");
        }
        

        // Date label
        focus.append("text").attr("class", "focus date").attr("x", 9).attr("y", 7);
        // Focus line
        focus.append("line").attr("class", "focus line").attr("y1", 0).attr("y2", chartObj.height);
        
        
        //Draw legend
        var legend = chartObj.mainDiv.append('div').attr("class", "legend");
        for (var y  in yObjs) {
            var series = legend.append('div');
            series.append('div').attr("class", "series-marker").style("background-color", color(y));
            series.append('p').text(y);
            yObjs[y].legend = series;
        }
        

        // Overlay to capture hover
        chartObj.svg.append("rect").attr("class", "overlay").attr("width", chartObj.width).attr("height", chartObj.height).on("mouseover", function () {
            focus.style("display", null);
        }).on("mouseout", function () {
            focus.style("display", "none");
        }).on("mousemove", mousemove);

        return chartObj;
        
        
        function mousemove() {
            var x0 = chartObj.xScale.invert(d3.mouse(this)[0]), i = chartObj.bisectYear(dataset, x0, 1), d0 = chartObj.data[i - 1], d1 = chartObj.data[i];
            
            try {
                var d = x0 - chartObj.xFunct(d0) > chartObj.xFunct(d1) - x0 ? d1 : d0;
            } catch (e) { 
                return;
            }
            
            var minY = chartObj.height;
            for (var y  in yObjs) {
                yObjs[y].tooltip.attr("transform", "translate(" + chartObj.xScale(chartObj.xFunct(d)) + "," + chartObj.yScale(yObjs[y].yFunct(d)) + ")");
                yObjs[y].tooltip.select("text").text(y + " " + chartObj.yFormatter(yObjs[y].yFunct(d)));
                minY = Math.min(minY, chartObj.yScale(yObjs[y].yFunct(d)));
            }

            focus.select(".focus.line").attr("transform", "translate(" + chartObj.xScale(chartObj.xFunct(d)) + ")").attr("y1", minY);
            focus.select(".focus.date").text("Date: " + chartObj.xFormatter(chartObj.xFunct(d)));
        }

    };
    return chartObj;
}

