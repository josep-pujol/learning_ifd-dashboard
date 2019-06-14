// Imports
import { formatDate, getData } from '/assets/js/utils.js';
import { runCurrencyConverter } from '/assets/js/currency-converter.js';
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
// https://api.exchangeratesapi.io/history?start_at=2019-04-01&end_at=2019-05-10&symbols=USD,GBP,CAD,AUD



// ------------- LATEST RATES CONSTRUCTOR  ------------- //

// Get lastest rates and display them as table
// suggested by tutor:
// https://stackoverflow.com/questions/37121301/how-to-check-if-the-response-of-a-fetch-is-a-json-object-in-javascript
// https://github.com/hschafer2017/Give-A-GIF/blob/a4d26dfc794a4fab36b5e38262360a3b749f3e72/index.js

function buildLatestRatesTable(dataLatest, data3DaysBack) {
    let data_table = "";                       
    console.log("start for loop");
    for (var key in dataLatest) {
        var trend;
        if (dataLatest.hasOwnProperty(key)) {
            console.log(key + ":  " + dataLatest[key]);
            
            if (dataLatest[key] - data3DaysBack[key] > 0) {
                trend = `<span style="font-size: 1.3em; color: green;"><i class="fa fa-caret-up"></i></span>`;
            } else if (dataLatest[key] - data3DaysBack[key] < 0) {
                trend = `<span style="font-size: 1.3em; color: red;"><i class="fa fa-caret-down"></i></span>`;
            } else {
                trend = `<span style="font-size: 1.3em; color: black;"><i class"fa">=</i></span>`;
            }

            data_table += `<tr><th scope="row">EUR / ${key}</th><td>${dataLatest[key].toFixed(4)}</td><td>${trend}</td></tr>`;
        }
    }

    console.log('data_table', data_table);
    var el = document.getElementById("latest_rates");
    el.innerHTML = "";
    el.innerHTML = data_table;
}




//  ------------- HISTORICAL MULTILINE CHART CONSTRUCTOR  ------------- //

// Get historical rates for the last 3 years and render rates in multiline chart
function buildHistoricalChart(dataHistorical) {
    let dataArray = [];
    let dateParser = d3.timeParse("%Y-%m-%d");
    
    for (var row in dataHistorical) {
        dataArray.push({ 'date': dateParser(row), 
                        'EUR_USD': parseFloat(dataHistorical[row]['USD']),
                        'EUR_GBP': parseFloat(dataHistorical[row]['GBP']),
                        'EUR_CAD': parseFloat(dataHistorical[row]['CAD']), 
                        'EUR_AUD': parseFloat(dataHistorical[row]['AUD']),
                        'EUR_NZD': parseFloat(dataHistorical[row]['NZD'])
                    });
    }
    
    console.log(dataArray);
    dataArray.sort(function(a, b){return a.date - b.date});
    console.log(dataArray);
    
    var chartObj = makeMultiLineChart(
        dataArray, 'date', 
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
}






//  ------------- PROMISES - ASYNC API CALLS ------------- //

let url_params = [baseURL + paramsLatest, 
                  baseURL + params3DaysBack, 
                  baseURL + paramsHistorical];
                  
let apiCalls = url_params.map(getData); // call getData on each array element and return array of promises


Promise.all(apiCalls).then(
    function(urls){
        let res = [];
        
        for (var i=0; i<urls.length; i++){
            console.log('loop at', i, urls[i]);
            res[i] = urls[i].rates;
            console.log(res[i]);
        }
        
        console.log(res);
        buildLatestRatesTable(res[0], res[1]);
        buildHistoricalChart(res[2]);


}).catch(function(urls){
    console.log("Error fetching some data from urls: " + urls);
});




//  ------------- EVENT CURRENCY CONVERTER BUTTON  ------------- //

// Button Event functionality to Convert Currencies
$(document).ready(function() {
    $("#convert").on("click", function() {
        runCurrencyConverter(getData, baseURL);
    });
});
