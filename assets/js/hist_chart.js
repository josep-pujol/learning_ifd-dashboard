const baseURL = "https://api.exchangeratesapi.io/"


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
var thirtyDaysBack = new Date(today - 30*24*60*60*1000);
var fromDate = formatDate(thirtyDaysBack);
var toDate = formatDate(yesterday);
var param_hist_period = `history?start_at=${fromDate}&end_at=${toDate}&symbols=USD,GBP,JPY,CAD,AUD`;


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
    var doc_data = "";
    var data_hist;

    getData(param_hist_period, function(data) {
                                console.log('data_hist');
                                console.dir(data);
                                data_hist = data.rates;

        var el = document.getElementById("hist-chart");
        el.innerHTML = ""
        el.innerHTML = data_hist;
    });
};

writeToDocument();
