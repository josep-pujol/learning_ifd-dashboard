# Forex Currency Exchange Markets Website
 
## Overview
 
### What is this website for?
 
This is a website for people working on currency exchange markets..
 
### What does it do?
 
This website is made of a single page  in which users can have the latest exchange rates, their trandes, or convert different amounts of one currency to another.
 
### How does it work
 
This website mainly uses **Javascript** to viewers through the site and control which **Javascript** is executed. The site is styled with **Bootstrap**. The information is queried from 
quiz has been created using **Javascript** and modal for enlarging images is displayed using some **JQuery** code. **Bower** has been used to manage package 
dependencies for deployment of site on github pages. The site can be viewed [HERE](https://futoisaru.github.io/hippo/)

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
    - multiline chart with the implemented 6 currencies 
    - the chart include focus lines with information labels

### Features Left to Implement
- None

## Tech Used

### Some the tech used includes:
- **HTML**, **CSS** and **Javascript**
  - Base languages used to create website
- [Bootstrap](http://getbootstrap.com/)
    - We use **Bootstrap4** to give our project a simple, responsive layout
- [JQuery](https://jquery.com)
    - Use **JQuery** for boostrap and displaying modal
- [npm](https://www.npmjs.com/)
    - We use **npm** to install **http-server** in order to view the site
- [Bower](https://bower.io)
    - Using **Bower** to manage package dependencies

## Testing
- Prototype code was written and tested using jasmine
- All code used on the site has been tested to ensure everything is working as expected
- Site viewed and tested in the following browsers:
  - Google Chrome
  - Opera
  - Microsoft Edge
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
## Code
- The code used for the multiline chart is a modified version from Andrew Sielen’s Blog [website](http://bl.ocks.org/asielen/44ffca2877d0132572cb)

### Information
- The information used to create this site was from a number of sources
    - Wikipedia webpage on [Hippos](https://en.wikipedia.org/wiki/Hippopotamus) and [Pygmy Hippos](https://en.wikipedia.org/wiki/Pygmy_hippopotamus)
    - The African Wildlife Foundation [website](http://www.awf.org/wildlife-conservation/hippopotamus)