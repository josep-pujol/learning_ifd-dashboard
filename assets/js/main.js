const baseURL = "https://api.exchangeratesapi.io/"
const param_latest = "latest?base=EUR&symbols=USD,GBP,JPY,CAD,AUD"


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
var queryDate = formatDate(yesterday);
var param_hist = `${queryDate}?base=EUR&symbols=USD,GBP,JPY,CAD,AUD`;


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


function writeToDocument() {
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
        
            var el = document.getElementById("testAPI");
            el.innerHTML = ""
            el.innerHTML = doc_data;

        });
    
    });
};

writeToDocument();
