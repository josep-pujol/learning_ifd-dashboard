const baseURL = "https://api.ratesapi.io/api/"


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


function writeToDocument(url_param) {
    
    var el = document.getElementById("converted-currency");
    el.innerHTML = "";
    
    var amountToConvert = document.getElementById("amount").value.replace(/,/g, '.');
    var fromCurrency = document.getElementById("from-currency").value;
    var toCurrency = document.getElementById("to-currency").value;
    console.log('Data from Form: ', amountToConvert, fromCurrency, toCurrency);
    
    if (isNaN(amountToConvert)) {
        el.innerHTML = "<p>The value added in the box is not a valid number</p>";
        return el.innerHTML;
    }


    if ( amountToConvert == 0 | fromCurrency == toCurrency ) {
        el.innerHTML = `<p>${amountToConvert*1}</p>`;
        
    } else {
        var param_latest = `latest?base=${fromCurrency}&symbols=${toCurrency}`;
        
        getData(param_latest, function(data) {
            var doc_data = "";
            console.dir(data);
            data = data.rates;
    
            var convertedCurrency = (amountToConvert * data[toCurrency]).toFixed(4);
            
            el.innerHTML = `<p>${convertedCurrency}</p>`;
        });
        
    }
}


