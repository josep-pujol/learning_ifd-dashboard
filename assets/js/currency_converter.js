
const baseURL = "https://api.ratesapi.io/api/"
var base_cur;
var conv_cur;
var param_latest = `latest?base=${base_cur}&symbols=${conv_cur}`;


function getData(url_param, cb) {
    var xhr = new XMLHttpRequest();
    var url = baseURL; // + url_param + "?" + currencies;
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

        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                console.log(key + ": " + data[key]);
                doc_data += "<p>" + key + ": " + data[key] + "</p>";
            }
        }


        console.log('doc_data', doc_data);

        var el = document.getElementById("currency-converter");
        el.innerHTML = ""
        el.innerHTML = doc_data;

    });
}

var url_param = "";
writeToDocument(url_param)