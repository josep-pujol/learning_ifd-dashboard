const baseURL = "https://api.ratesapi.io/api/"


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


function writeToDocument(url_param) {
    
    var amountToConvert = document.getElementById("amount").value;
    var fromCurrency = document.getElementById("from-currency").value;
    var toCurrency = document.getElementById("to-currency").value;
    console.log('Data from Form: ', amountToConvert, fromCurrency, toCurrency);
    
    var param_latest = `latest?base=${fromCurrency}&symbols=${toCurrency}`;
    
    
    if ( fromCurrency == toCurrency ) {
        
        var el = document.getElementById("converted-currency");
        el.innerHTML = "";
        el.innerHTML = `<p>${amountToConvert}</p>`;
        
    } else {
    
        getData(param_latest, function(data) {
            var doc_data = "";
            console.dir(data);
            console.log('data', data);
            console.log('data.rates', data.rates);
            data = data.rates;
    
            var convertedCurrency = amountToConvert * data[toCurrency];
            
            var el = document.getElementById("converted-currency");
            el.innerHTML = "";
            el.innerHTML = `<p>${convertedCurrency}</p>`;
        });
        
    }
}


