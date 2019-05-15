
//import makeMultiLineChart from '/assets/js/makeMultiLineChart.js';


const baseURL = "https://api.exchangeratesapi.io/"
var doc_data = "";
var data_hist_chart;

function formatDate(dateToFormat) {
    var dd = dateToFormat.getDate();
    var mm = dateToFormat.getMonth()+1; 
    var yyyy = dateToFormat.getFullYear();
    if(dd<10) { dd='0'+dd;} 
    if(mm<10) { mm='0'+mm;}
    return `${yyyy}-${mm}-${dd}`;
}

var today = new Date();
var yesterday = new Date(today - 24*60*60*1000);
var thirtyDaysBack = new Date(today - 90 * 24*60*60*1000);
var fromDate = formatDate(thirtyDaysBack);
var toDate = formatDate(yesterday);
var param_hist_period = `history?start_at=${fromDate}&end_at=${toDate}&symbols=USD,GBP,JPY,CAD,AUD`;
// https://api.exchangeratesapi.io/history?start_at=2019-04-01&end_at=2019-05-10&symbols=USD,GBP,JPY,CAD,AUD


function getData(url_param, cb) {
    var xhr = new XMLHttpRequest();
    var url = baseURL + url_param;
    console.log(url);
    xhr.open("GET", url);
    xhr.send();

    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            cb(JSON.parse(this.responseText));
        }
    };
}






// http://bl.ocks.org/asielen/44ffca2877d0132572cb

function makeMultiLineChart(dataset, xName, yObjs, axisLabels) {
    console.log('START makeMultiLineChart');
    var chartObj = {};
    var color = d3.scale.category10();
    chartObj.xAxisLabel = axisLabels.xAxis;
    chartObj.yAxisLabel = axisLabels.yAxis;
    /*
     yObjsects format:
     {y1:{column:'',name:'name',color:'color'},y2}
     */

    chartObj.data = dataset;
    console.log('dataset chart.Obj.data', chartObj.data);
    chartObj.margin = {top: 20, right: 45, bottom: 45, left: 85};
    chartObj.width = 650 - chartObj.margin.left - chartObj.margin.right;
    chartObj.height = 480 - chartObj.margin.top - chartObj.margin.bottom;

// So we can pass the x and y as strings when creating the function
    chartObj.xFunct = function(d){return d[xName]};

// For each yObjs argument, create a yFunction
    function getYFn(column) {
        return function (d) {
            return d[column];
        };
    }

// Object instead of array
    chartObj.yFuncts = [];
    console.log('loopinng yObjs');
    console.log(yObjs);
    for (var y  in yObjs) {
        console.log(y);
        yObjs[y].name = y;
        yObjs[y].yFunct = getYFn(yObjs[y].column); //Need this  list for the ymax function
        chartObj.yFuncts.push(yObjs[y].yFunct);
    }

//Formatter functions for the axes
    chartObj.formatAsDate = d3.time.format("%d/%m/%Y");
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

    chartObj.xFormatter = chartObj.formatAsNumber;
    chartObj.yFormatter = chartObj.formatAsFloat;

    chartObj.bisectYear = d3.bisector(chartObj.xFunct).left; //< Can be overridden in definition

//Create scale functions
    chartObj.xScale = d3.scale.linear().range([0, chartObj.width]).domain(d3.extent(chartObj.data, chartObj.xFunct)); //< Can be overridden in definition

// Get the max of every yFunct
    chartObj.max = function (fn) {
        return d3.max(chartObj.data, fn);
    };
    var scale_margin = 0.1;
    chartObj.yScale = d3.scale.linear().range([chartObj.height, 0]).domain([d3.min(chartObj.yFuncts.map(chartObj.max))-scale_margin, 
                                                                            d3.max(chartObj.yFuncts.map(chartObj.max))+scale_margin]);

    chartObj.formatAsYear = d3.time.format("%d/%m/%Y");//d3.format(""); ???

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
        console.log('yObjs ')
        for (var y  in yObjs) {
            console.log('yObjs[y].line', yObjs[y].line)
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
        // Add all the divs to make it centered and responsive
        chartObj.mainDiv.append("div"
                                ).attr("class", "inner-wrapper").append("div"
                                ).attr("class", "outer-box").append("div"
                                ).attr("class", "inner-box");
        chartSelector = selector + " .inner-box";
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
                                        ).append("g"
                                            ).attr("transform", "translate(" + chartObj.margin.left + "," + chartObj.margin.top + ")");

        // Draw Lines
        for (var y  in yObjs) {
            console.log(y);
            yObjs[y].path = chartObj.svg.append("path"
                                    ).datum(chartObj.data).attr("class", "line"
                                    ).attr("d", yObjs[y].line).style("stroke", color(y)
                                    ).attr("data-series", y).on("mouseover", function () {
                focus.style("display", null);
            }).on("mouseout", function () {
                focus.transition().delay(700).style("display", "none");
            }).on("mousemove", mousemove);
            console.log('yObjs[y].line', yObjs[y].line)
        }
        

        // Draw Axis
        chartObj.svg.append("g").attr("class", "x axis").attr("transform", "translate(0," + chartObj.height + ")"
                                        ).call(chartObj.xAxis
                                        ).append("text"
                                            ).attr("class", "label"
                                            ).attr("x", chartObj.width / 2
                                            ).attr("y", 37).style("text-anchor", "middle").text(chartObj.xAxisLabel);

        chartObj.svg.append("g").attr("class", "y axis"
                                        ).call(chartObj.yAxis
                                            ).append("text"
                                            ).attr("class", "label"
                                            ).attr("transform", "rotate(-90)"
                                            ).attr("y", -62
                                            ).attr("x", -chartObj.height / 2
                                            ).attr("dy", ".71em").style("text-anchor", "middle").text(chartObj.yAxisLabel);

        //Draw tooltips
        var focus = chartObj.svg.append("g").attr("class", "focus").style("display", "none");

        for (var y  in yObjs) {
            yObjs[y].tooltip = focus.append("g");
            yObjs[y].tooltip.append("circle").attr("r", 2);
            yObjs[y].tooltip.append("rect").attr("x", 7).attr("y","-17").attr("width", 75).attr("height",'0.8em');
            yObjs[y].tooltip.append("text").attr("x", 9).attr("y","-10").attr("dy", ".35em");
        }

        // Date label
        focus.append("text").attr("class", "focus date_").attr("x", 9).attr("y", 7);
        // Focus line
        focus.append("line").attr("class", "focus line").attr("y1", 0).attr("y2", chartObj.height);

        //Draw legend
        var legend = chartObj.mainDiv.append('div').attr("class", "legend");
        for (var y  in yObjs) {
            series = legend.append('div');
            series.append('div').attr("class", "series-marker").style("background-color", color(y));
            series.append('p').text(y);
            yObjs[y].legend = series;
        }

        // Overlay to capture hover
        chartObj.svg.append("rect"
                            ).attr("class", "overlay"
                            ).attr("width", chartObj.width
                            ).attr("height", chartObj.height).on("mouseover", function () {
            focus.style("display", null);
        }).on("mouseout", function () {
            focus.style("display", "none");
        }).on("mousemove", mousemove);

        return chartObj;
        
        function mousemove() {
            var x0 = chartObj.xScale.invert(d3.mouse(this)[0]), i = chartObj.bisectYear(dataset, x0, 1), d0 = chartObj.data[i - 1], d1 = chartObj.data[i];
            try {
                var d = x0 - chartObj.xFunct(d0) > chartObj.xFunct(d1) - x0 ? d1 : d0;
            } catch (e) { return;}
            minY = chartObj.height;
            for (var y  in yObjs) {
                yObjs[y].tooltip.attr("transform", "translate(" + chartObj.xScale(chartObj.xFunct(d)) + "," + chartObj.yScale(yObjs[y].yFunct(d)) + ")");
                yObjs[y].tooltip.select("text").text(y + " " + chartObj.yFormatter(yObjs[y].yFunct(d)));
                minY = Math.min(minY, chartObj.yScale(yObjs[y].yFunct(d)));
            }

            focus.select(".focus.line").attr("transform", "translate(" + chartObj.xScale(chartObj.xFunct(d)) + ")").attr("y1", minY);
            focus.select(".focus.date_").text("Date: " + chartObj.xFormatter(chartObj.xFunct(d)));
        }

    };
    console.log('END makeMultiLineChart');
    return chartObj;
}










function writeToDocument() {

    getData(param_hist_period, function(data) {
        console.dir(data);
        data = data.rates;
        var data_obj = [];
        var date_parser = d3.timeParse("%Y-%m-%d");
        for (var row in data) {
            data_obj.push({ 'date': date_parser(row), 
                            'EUR_USD': parseFloat(data[row]['USD']),
                            'EUR_GBP': parseFloat(data[row]['GBP']),
                            'EUR_CAD': parseFloat(data[row]['CAD']), 
                            'EUR_AUD': parseFloat(data[row]['AUD']) 
                           // 'EUR_JPY': parseFloat(data[row]['JPY']) 
                            })
        }
        
        console.log(data_obj);
        data_obj.sort(function(a, b){return a.date - b.date});
        console.log(data_obj);
        
        var chartObj = makeMultiLineChart(data_obj, 'date', 
        {
            'USD': {column: 'EUR_USD'},
            'GBP': {column: 'EUR_GBP'},
            'CAD': {column: 'EUR_CAD'},
            'AUD': {column: 'EUR_AUD'}
           // 'JPY': {column: 'EUR_JPY'}
        }, 
        {xAxis: 'Date', yAxis: 'Exchange Rate'});
        
        chartObj.bind("#hist-chart");
        
        chartObj.render();
        return data_obj;
        
    });
}

writeToDocument();
    