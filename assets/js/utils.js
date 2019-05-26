

// To format a date object to a valid string date for url query
export function formatDate(dateToFormat) {
    var dd = dateToFormat.getDate();
    var mm = dateToFormat.getMonth()+1; 
    var yyyy = dateToFormat.getFullYear();
    
    if(dd<10) { dd='0'+dd;} 
    if(mm<10) { mm='0'+mm;}
    
    return `${yyyy}-${mm}-${dd}`;
}


// General function to call the API with different paramenters in url
export function getData(url_param, cb) {
    const baseURL = "https://api.exchangeratesapi.io/";
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
