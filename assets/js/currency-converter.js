// Get conversion rate for selected amount and currencies. Display results or warning message

export function runCurrencyConverter(getData, baseURL) {
    var el = document.getElementById("converted-currency");
    el.innerHTML = "";
    
    var amountToConvert = document.getElementById("amount").value.replace(/,/g, '.');
    var fromCurrency = document.getElementById("from-currency").value;
    var toCurrency = document.getElementById("to-currency").value;

    
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
        
    
        // call getData and resolve promise to get conversion rate
        getData(baseURL + param_latest).then(function(data) {
            data = data.rates;
            var convertedCurrency = (amountToConvert * data[toCurrency]).toFixed(4);
            
            el.innerHTML = `<p class="m-1">${(amountToConvert*1).toFixed(4)} ${fromCurrency}  <strong> = </strong> <h5>${(convertedCurrency*1).toFixed(4)} ${toCurrency}</h5></p>`;
            
        }).catch(function(err) {
            console.log('Error Currency Converter Tool, getData: ', err);
        });
        
    }
}

