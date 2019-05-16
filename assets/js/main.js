// Imports
import { formatDate, getData } from '/assets/js/utils.js';


// Define const and variables
const param_latest = "latest?base=EUR&symbols=USD,GBP,JPY,CAD,AUD"

var today = new Date();
var yesterday = new Date(today - 24*60*60*1000);
var queryDate = formatDate(yesterday);
var param_hist = `${queryDate}?base=EUR&symbols=USD,GBP,JPY,CAD,AUD`;


function getLatestRates() {
    var doc_data = "";
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
            el.innerHTML = ""
            el.innerHTML = doc_data;

        });
    
    });
};

getLatestRates();
