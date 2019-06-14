// Imports
import { formatDate, getData } from '/assets/js/utils.js';
import { makeMultiLineChart } from '/assets/js/multiline-chart.js';


// Constants and variables
const baseURL = "https://api.exchangeratesapi.io/";
const currencies = "USD,GBP,CAD,AUD,NZD";
const paramsLatest = "latest?base=EUR&symbols=" + currencies;

let today = new Date();
let threeDaysBack = new Date(today - 24*60*60*1000);
let threeYearsBack = new Date(today - 1090 * 24*60*60*1000);
let params3DaysBack = `${formatDate(threeDaysBack)}?base=EUR&symbols=` + currencies;
let paramsHistorical = `history?start_at=${formatDate(threeYearsBack)}&end_at=${formatDate(threeDaysBack)}&symbols=` + currencies;



// Get rates for last 3 years and display them as table
function getLatestRates() {
    var data_latest;
    var data_hist;
    var data_table = "";
    
    getData(baseURL + paramsLatest, function(data) {
                            console.log('data_latest');
                            console.dir(data);
                            data_latest = data.rates;
                          
                        
        getData(baseURL + params3DaysBack, function(data) {
                                console.log('data_hist');
                                console.dir(data);
                                data_hist = data.rates;
                       
            
            console.log("start for loop")
            for (var key in data_latest) {
                var trend;
                if (data_latest.hasOwnProperty(key)) {
                    console.log(key + ":  " + data_latest[key]);
                    
                    if (data_latest[key] - data_hist[key] > 0) {
                        trend = `<span style="font-size: 1.3em; color: green;"><i class="fa fa-caret-up"></i></span>`;
                    } else if (data_latest[key] - data_hist[key] < 0) {
                        trend = `<span style="font-size: 1.3em; color: red;"><i class="fa fa-caret-down"></i></span>`;
                    } else {
                        trend = `<span style="font-size: 1.3em; color: black;"><i class"fa">=</i></span>`;
                    }

                    data_table += `<tr><th scope="row">EUR / ${key}</th><td>${data_latest[key].toFixed(4)}</td><td>${trend}</td></tr>`;
                }
            }

        
            console.log('data_table', data_table);
        
            var el = document.getElementById("latest_rates");
            el.innerHTML = "";
            el.innerHTML = data_table;

        });
    
    });
}

getLatestRates();



// Get historical rates for the last 120 days and render rates in multiline chart
function getHistoricalChart() {
 
    getData(baseURL + paramsHistorical, function(data) {
        console.dir(data);
        data = data.rates;
        var data_obj = [];
        var date_parser = d3.timeParse("%Y-%m-%d");
        for (var row in data) {
            data_obj.push({ 'date': date_parser(row), 
                            'EUR_USD': parseFloat(data[row]['USD']),
                            'EUR_GBP': parseFloat(data[row]['GBP']),
                            'EUR_CAD': parseFloat(data[row]['CAD']), 
                            'EUR_AUD': parseFloat(data[row]['AUD']),
                            'EUR_NZD': parseFloat(data[row]['NZD'])
                        });
        }
        
        console.log(data_obj);
        data_obj.sort(function(a, b){return a.date - b.date});
        console.log(data_obj);
        
        var chartObj = makeMultiLineChart(data_obj, 'date', 
        {
            'USD': {column: 'EUR_USD'},
            'GBP': {column: 'EUR_GBP'},
            'CAD': {column: 'EUR_CAD'},
            'AUD': {column: 'EUR_AUD'},
            'NZD': {column: 'EUR_NZD'}
        }, 
        {xAxis: 'Date', yAxis: 'Exchange Rate'});
        console.dir(chartObj);
        console.log('before chartObj.bind("#hist-chart"); ');
        chartObj.bind("#hist-chart");
        
        console.log('before chartObj.render();');
        chartObj.render();
        console.log('before return');
        return data_obj;
        
    });
}

getHistoricalChart();



   