
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
    - the chart includes focus lines with information labels for each currency
    - there is a dynamic label with the current date on the top left of the chart


## UX

### Layout
- used Bootstrap grid to split the site in different sections
- white background which separates different sections in different background color
- top bar with title used dark blue background color with white text
- middle section, with two subsections, grey background with strong black text
- bottom section with multiline chart:
    - grey background with strong black text
    - legend with different colors to differentiate currencies

### Wireframe

I used Google Sheets to create the original wireframe / mock-up. See screenshot of the wireframe:

![Testing as .png](https://github.com/josep-pujol/learning_ifd-dashboard/blob/master/wireframe/wireframe_ifd-dashboard.PNG)

## Technologies Used

### Some the tech used includes:

- **HTML**, **CSS** and **Javascript**
    - Base languages used to create the site templates
- [Bootstrap](http://getbootstrap.com/)
    - Used **Bootstrap4** for a responsive layout and styling
- [JQuery](https://jquery.com)
    - **JQuery** as a dependency for **D3.js**
- [D3.js](https://d3js.org)
    - Used **d3.js** to build and render a Multiline chart
- [Jasmine](https://jasmine.github.io/)
    - Used for unit testing 
- [Github](https://github.com/)
    - Used as repository of the project 
- [Github Pages](https://pages.github.com/)
    - To deploy the project


## Testing
- Unit tests with Jasmine include:
    - Tests several dates to ensure the function formatDate return appropiate formatting
    - Test a call to the API and verifies that essential keys are in the response
- All code used on this site has been manually tested to ensure everything is working as expected. Some tests include:
    - site responsiveness
    - functionality of the currency converter
        - different currencies 
        - different amounts
        - invalid amounts
    - mouse hovering over the Multiline chart to display dynamic labels including: currency, exchange rate and date
- Site viewed and tested in the following browsers:
  - Google Chrome
  - Microsoft Edge
  - Mozilla Firefox


## Contributing
 
### Getting the code up and running

1. Firstly you will need to download this repository; or clone it by running the ```git clone <project's Github URL>``` command
2. After, you'll need to ensure you have **npm** installed. You can get **npm** by installing Node from [here](https://nodejs.org/en/)
3. After those dependencies have been installed, you only need to run the code in your server, using "index.html" file as entry point

To deploy in Github Pages you can follow official instructions from Github Pages: [Instructions](https://help.github.com/en/articles/configuring-a-publishing-source-for-github-pages)


## Credits

### Code

- The code used for the multiline chart is a modified version from [Andrew Sielen’s Blog](http://bl.ocks.org/asielen/44ffca2877d0132572cb)

### Data

- The data used to create this site was from:
    - [European Central Bank - Euro Reference Exchange Rates](https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.en.html)
    - The [Exchange Rates API](https://exchangeratesapi.io/) is a free service provided by Madis Väin under the MIT license [Github page](https://github.com/exchangeratesapi/exchangeratesapi)
 
### Acknowledgements
To my mentor Theofanis Despoudis for his time, suggestions, and constructive feedback for this project
