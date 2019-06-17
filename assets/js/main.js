// Imports
import { formatDate, getData } from './utils.js';
import { runCurrencyConverter } from './currency-converter.js';
import { makeMultiLineChart } from './multiline-chart.js';


// Constants and variables
const baseURL = "https://api.exchangeratesapi.io/";
const currencies = "USD,GBP,CAD,AUD,NZD";
const paramsLatest = "latest?base=EUR&symbols=" + currencies;

let today = new Date();
let threeDaysBack = new Date(today - 3 * 24*60*60*1000);
let threeYearsBack = new Date(today - 1090 * 24*60*60*1000);
let params3DaysBack = `${formatDate(threeDaysBack)}?base=EUR&symbols=` + currencies;
let paramsHistorical = `history?start_at=${formatDate(threeYearsBack)}&end_at=${formatDate(threeDaysBack)}&symbols=` + currencies;



// ------------- LATEST RATES TABLE CONSTRUCTOR  ------------- //

// Get lastest rates and display them as table
function buildLatestRatesTable(dataLatest, data3DaysBack) {
    let data_table = "";                       

    for (var key in dataLatest) {
        var trend;
        if (dataLatest.hasOwnProperty(key)) {
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
    
    dataArray.sort(function(a, b){return a.date - b.date});

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

    chartObj.bind("#hist-chart");
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
            res[i] = urls[i].rates;
        }
        
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
