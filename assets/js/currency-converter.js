
// import { getData } from './utils.js';

const baseURL = "https://api.exchangeratesapi.io/";

function getData(url_param, cb) {
    var xhr = new XMLHttpRequest();
    var url = baseURL + url_param;
    console.log(url);
    
    xhr.open("GET", url);
    xhr.send();

    xhr.onreadystatechange = function() {
        console.log(this.readyState);
        if (this.readyState == 4 && this.status == 200) {
            cb(JSON.parse(this.responseText));
        }
    };
}


// Get conversion rate for selected amount and currencies. Display results or warning message
function runCurrencyConverter() {
    console.log('START runCurrencyConverter');
    var el = document.getElementById("converted-currency");
    el.innerHTML = "";
    
    var amountToConvert = document.getElementById("amount").value.replace(/,/g, '.');
    var fromCurrency = document.getElementById("from-currency").value;
    var toCurrency = document.getElementById("to-currency").value;
    console.log('Data from Form: ', amountToConvert, fromCurrency, toCurrency);
    
    
    // Show warning message when the amount introduced is not a valid number
    if (isNaN(amountToConvert)) {
        el.innerHTML = `<div class="alert alert-dismissible alert-warning mx-md-5 mt-3">
                          <h5 class="alert-heading">Warning!</h5>
                          <p class="mb-0">The amount is not valid!</p>
                        </div>`;
        return el.innerHTML;
    }

    // No need to call API when amount is 0 or currency is the same
    if ( amountToConvert == 0 | fromCurrency == toCurrency ) {
        el.innerHTML = `<p class="m-1">${(amountToConvert*1).toFixed(4)} ${fromCurrency}  <strong> = </strong> <h5>${(amountToConvert*1).toFixed(4)} ${toCurrency}</h5></p>`;
        
    } else {
        
        // Get exchange rate from API and calculate conversion with amount 
        var param_latest = `latest?base=${fromCurrency}&symbols=${toCurrency}`;
        
        getData(param_latest, function(data) {
            console.dir(data);
            data = data.rates;
    
            var convertedCurrency = (amountToConvert * data[toCurrency]).toFixed(4);
            
            el.innerHTML = `<p class="m-1">${(amountToConvert*1).toFixed(4)} ${fromCurrency}  <strong> = </strong> <h5>${(convertedCurrency*1).toFixed(4)} ${toCurrency}</h5></p>`;
        });
        
    }
}

