

// To format a date object to a valid string date for url query
export function formatDate(dateToFormat) {
    var dd = dateToFormat.getDate();
    var mm = dateToFormat.getMonth()+1; 
    var yyyy = dateToFormat.getFullYear();
    
    if(dd<10) { dd='0'+dd;} 
    if(mm<10) { mm='0'+mm;}
    
    return `${yyyy}-${mm}-${dd}`;
}


// General function to fetch data asynch from url
export function getData(url) {
    return new Promise(function(resolve, reject){
        console.log('getData_promise', url);
        let xhr = new XMLHttpRequest();
    
        xhr.open("GET", url);
        xhr.send();
        xhr.onreadystatechange = function() {
            console.log(this.readyState);
            if (this.readyState == 4 && this.status == 200) {
                resolve(JSON.parse(this.responseText));
            }
        };  
        xhr.onerror = function(err) {
            console.log('ERROR at getData: ', err);
        };
    });
}
