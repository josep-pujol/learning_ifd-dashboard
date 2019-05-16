
import { makeMultiLineChart } from '/assets/js/makeMultiLineChart.js';


const baseURL = "https://api.exchangeratesapi.io/";


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
        console.dir(chartObj)
        console.log('before chartObj.bind("#hist-chart"); ')
        chartObj.bind("#hist-chart");
        
        console.log('before chartObj.render();')
        chartObj.render();
        console.log('before return')
        return data_obj;
        
    });
}

writeToDocument();
    