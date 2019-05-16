// Imports
import { formatDate, getData } from '/assets/js/utils.js';
import { makeMultiLineChart } from '/assets/js/multiline-chart.js';


// Define const and variables
const param_latest = "latest?base=EUR&symbols=USD,GBP,JPY,CAD,AUD";
var doc_data = "";

var today = new Date();
var yesterday = new Date(today - 24*60*60*1000);
var someDaysBack = new Date(today - 90 * 24*60*60*1000);
var queryDate = formatDate(yesterday);
var param_hist = `${queryDate}?base=EUR&symbols=USD,GBP,JPY,CAD,AUD`;

var fromDate = formatDate(someDaysBack);
var toDate = formatDate(yesterday);
var param_hist_period = `history?start_at=${fromDate}&end_at=${toDate}&symbols=USD,GBP,JPY,CAD,AUD`;
// https://api.exchangeratesapi.io/history?start_at=2019-04-01&end_at=2019-05-10&symbols=USD,GBP,JPY,CAD,AUD




function getLatestRates() {
    var data_latest;
    var data_hist;
    
    getData(param_latest, function(data) {
                            console.log('data_latest');
                            console.dir(data);
                            data_latest = data.rates;
                          
                        
        getData(param_hist, function(data) {
                                console.log('data_hist');
                                console.dir(data);
                                data_hist = data.rates;
                       
    
            console.log(data_hist);
            
            console.log("start for loop")
            for (var key in data_latest) {
                var trend;
                if (data_latest.hasOwnProperty(key)) {
                    console.log(key + ": " + data_latest[key]);
                    
                    if (data_latest[key] - data_hist[key] > 0) {
                        trend = "^";
                    } else if (data_latest[key] - data_hist[key] < 0) {
                        trend = "v";
                    } else {
                        trend = "-";
                    }
                    
                    
                    doc_data += `<p>EUR / ${key} :  ${data_latest[key]}    ${trend} </p>`;
                }
            }
        
            console.log('doc_data', doc_data);
        
            var el = document.getElementById("latest_rates");
            el.innerHTML = "";
            el.innerHTML = doc_data;

        });
    
    });
}

getLatestRates();




function getHistoricalChart() {
 
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
            'AUD': {column: 'EUR_AUD'}
           // 'JPY': {column: 'EUR_JPY'}
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
    