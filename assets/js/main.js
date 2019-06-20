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

// Display lastest rates as table
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

// Build a multiline chart to render rates for the last 3 years
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



//  ------------- ASYNC API CALLS ------------- //

// Calls to the API to get data for the Latest Rates Table and the Multiline chart
async function apiCalls() {
    try {
        const dataLatest = await getData(baseURL + paramsLatest);
        const latestRates = dataLatest.rates;
        
        const data3DaysBack = await getData(baseURL + params3DaysBack);
        const threeDaysBackRates = data3DaysBack.rates;
        
        const dataHistorical = await getData(baseURL + paramsHistorical);
        const historicalRates = dataHistorical.rates;
                
        buildLatestRatesTable(latestRates, threeDaysBackRates);
        buildHistoricalChart(historicalRates);
    } 
    catch (err) {
        console.log("Error fetching data: " + err);
    }
}

apiCalls();



//  ------------- EVENT CURRENCY CONVERTER BUTTON  ------------- //

// Button Event functionality to Convert Currencies
$(document).ready(function() {
    $("#convert").on("click", function() {
        runCurrencyConverter(getData, baseURL);
    });
});

