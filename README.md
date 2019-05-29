# Forex Currency Exchange Markets Website
 
## Overview
 
### What is this website for?
 
This is a website for people working on the currency exchange markets.
 
### What does it do?
 
This website is made of a single page in which users can have the latest exchange rates, their trends over time, or the capability to convert different amounts of one currency to another.
 
### How does it work
 
This website mainly uses **Javascript** to display and provide interactivity to the users. The site is styled with **Bootstrap** and is responsive.
The information is queried from the European Central Bank API using  **XMLHttpRequest** standard, and then rendered with **jQuery** and **D3.js**. 
The site can be viewed [HERE]()

## Features
 
### Existing Features
- section with latest rates compared to Euros
    - latest exchange rate available from API
    - trend icon to visualy display changes in the exchange rate on the last 24h
- currency converter tool  
    - converts the selected amount between currencies
    - rates are the latest available from the API
    - 6 currencies to convert both ways
    - warning message when amount is not a valid number
- section with historical rates
    - multiline chart with 3 years information of the implemented currencies 
    - the chart include focus lines with information labels for each lines
    - there is a dynamic label with the current date on the top left of the chart

### Features Left to Implement
- None

## Tech Used

### Some the tech used includes:
- **HTML**, **CSS** and **Javascript**
    - Base languages used to create website
- [Bootstrap](http://getbootstrap.com/)
    - Used **Bootstrap4** to give to the project a simple, responsive layout
- [JQuery](https://jquery.com)
    - **JQuery** as a dependency for **D3.js**
- [D3.js](https://d3js.org)
    - Used **d3.js** to build and render the multiline chart


## Testing
- Prototype code was written and tested using jasmine
- All code used on the site has been tested to ensure everything is working as expected
- Site viewed and tested in the following browsers:
  - Google Chrome
  - Brave
  - Mozilla Firefox

## Contributing
 
### Getting the code up and running
1. Firstly you will need to clone this repository by running the ```git clone <project's Github URL>``` command
2. After you've that you'll need to make sure that you have **npm** installed
  1. You can get **npm** by installing Node from [here](https://nodejs.org/en/)
4. After those dependencies have been installed you'll need to make sure that you have **http-server** installed. You can install this by running the following: ```npm install -g http-server # this also may require sudo on Mac/Linux```
5. Once **http-server** is installed run ```http-server -c-1```
6. The project will now run on [localhost](http://127.0.0.1:8080)
7. Make changes to the code and if you think it belongs in here then just submit a pull request

## Credits

### Code
- The code used for the multiline chart is a modified version from [Andrew Sielen’s Blog](http://bl.ocks.org/asielen/44ffca2877d0132572cb)

### Data
- The data used to create this site was from:
    - [European Central Bank - Euro Reference Exchange Rates](https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.en.html)
    - The [Exchange Rates API](https://exchangeratesapi.io/) is a free service provided by Madis Väin under the MIT license [Github page](https://github.com/exchangeratesapi/exchangeratesapi)