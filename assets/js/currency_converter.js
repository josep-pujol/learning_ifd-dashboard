
const baseURL = "https://api.ratesapi.io/api/"
var base_cur = "EUR";
var conv_cur = "USD";
var param_latest = `latest?base=${base_cur}&symbols=${conv_cur}`;


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

    getData(url_param, function(data) {
        var doc_data = "";
        console.dir(data);
        console.log('data', data);
        console.log('data.rates', data.rates);
        data = data.rates;


        var amountConvert = document.getElementById("amount").value;
        var fromCurrency = document.getElementById("from-currency").value;
        var toCurrency = document.getElementById("to-currency").value;
        console.log('form data', amountConvert, fromCurrency, toCurrency);

        var convertedCurrency = amountConvert * data[toCurrency];
        var el = document.getElementById("converted-currency");
        el.innerHTML = "";
        el.innerHTML = `<p>${convertedCurrency}</p>`;

    });
}


writeToDocument(param_latest)
