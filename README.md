# Forex Currency Exchange Markets Website
 
## Overview
 
### What is this website for?
 
This website gives information on the currency exchange rates for different currencies.
 
### What does it do?
 
This website is made of a single page in which users have the latest exchange rates, their trends over time, or the capability to convert different amounts of one currency to another.
 
### How does it work
 
This website mainly uses **Javascript** to display and provide interactivity to the users. The site is styled with **Bootstrap** and is responsive.
The information is queried from the European Central Bank API using  **XMLHttpRequest** standard, and then rendered with **jQuery** and **D3.js**. 
The site can be viewed [HERE](https://josep-pujol.github.io/learning_ifd-dashboard/)

## Features
 
### Existing Features
- section with latest rates using Euros as a base
    - latest exchange rate available from API
    - trend icon to visualy display latest changes in exchange rates
- currency converter tool  
    - converts the selected amount between currencies
    - rates are the latest available from the API
    - 6 currencies to convert, both ways
    - warning message when amount is not a valid number
- section with historical rates
    - multiline chart with 3 years information of the implemented currencies 
    - the chart include focus lines with information labels for each line
    - there is a dynamic label with the current date on the top left of the chart

### Features Left to Implement
- None

## Tech Used

### Some the tech used includes:
- **HTML**, **CSS** and **Javascript**
    - Base languages used to create website
- [Bootstrap](http://getbootstrap.com/)
    - Used **Bootstrap4** to give to the project a responsive layout and styles
- [JQuery](https://jquery.com)
    - **JQuery** as a dependency for **D3.js**
- [D3.js](https://d3js.org)
    - Used **d3.js** to build and render the multiline chart
- [Jasmine](https://jasmine.github.io/)
    - Used for the unit tests  


## Testing
- Prototype code was written and tested using jasmine. Tests include:
    - Tests several dates to ensure function formatDate provide appropiate formatting
    - Test a call to the API and looks for key information in the response
- All code used on the site has been manually tested to ensure everything is working as expected
- Site viewed and tested in the following browsers:
  - Google Chrome
  - Microsoft Edge
  - Mozilla Firefox

## Contributing
 
### Getting the code up and running
1. Firstly you will need to download this repository; or clone it by running the ```git clone <project's Github URL>``` command
2. After, you'll need to ensure you have **npm** installed
  1. You can get **npm** by installing Node from [here](https://nodejs.org/en/)
3. After those dependencies have been installed you only need to run the code in a server, being the entrance point the "index.html" file

## Credits

### Code
- The code used for the multiline chart is a modified version from [Andrew Sielen’s Blog](http://bl.ocks.org/asielen/44ffca2877d0132572cb)

### Data
- The data used to create this site was from:
    - [European Central Bank - Euro Reference Exchange Rates](https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.en.html)
    - The [Exchange Rates API](https://exchangeratesapi.io/) is a free service provided by Madis Väin under the MIT license [Github page](https://github.com/exchangeratesapi/exchangeratesapi)
 
### Acknowledgements
To my mentor Theofanis Despoudis for his time, suggestions, and constructive feedback for this project
