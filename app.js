'use strict';

// Holds business hours in array
var businessHours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'];

var tableEl, rowEl, tableHeadEl;

function creatTable() {
  tableEl = document.getElementById('cookie-table');
  rowEl = document.createElement('tr');
  tableHeadEl = document.createElement('th'); //create empty first column
  rowEl.appendChild(tableHeadEl);

  // create business hours columns
  for (var i = 0; i < businessHours.length; i++) {
    tableHeadEl = document.createElement('th');
    tableHeadEl.textContent = businessHours[i];
    rowEl.appendChild(tableHeadEl); // add th elemet to row
  }

  // create daily location total column
  tableHeadEl = document.createElement('th');
  tableHeadEl.textContent = 'Daily Location Total';
  rowEl.appendChild(tableHeadEl); // add th element to row
  tableEl.appendChild(rowEl); // add row element to table
}

// Cookie Store Object
function Store(storeName, minCustomersPerHour, maxCustomersPerHour, avgCookiesPerCustomer) {
  this.storeName = storeName;
  this. minCustomersPerHour = minCustomersPerHour;
  this.maxCustomersPerHour = maxCustomersPerHour;
  this.avgCookiesPerCustomer = avgCookiesPerCustomer;
  this.numOfCookiesForEveryHour = [];
  this.totalDailyCookies = 0;
}

// Returns a random number of customers between minCustomersPerHour and maxCustomersPerHour
Store.prototype.genRandomNumOfCustomers = function() {
  var randomNumber = Math.floor(Math.random() * (this.maxCustomersPerHour - this.minCustomersPerHour)) + this.minCustomersPerHour;
  console.log('Random number: ' + randomNumber);
  return randomNumber;
};

// Calculates the number of cookies sold per hour based on genRandomNumOfCustomers() and the avgCookiesPerCustomer. Places the number of cookies sold per hour in the Store's numOfCookiesForEveryHour array.
Store.prototype.calculateNumOfCookiesPerHour = function() {
  for (var index = 0; index < businessHours.length; index++) {
    var numberOfCookies = Math.floor(this.genRandomNumOfCustomers() * this.avgCookiesPerCustomer);
    this.numOfCookiesForEveryHour.push(numberOfCookies);

    console.log('Number of cookies for ' + this.storeName + ' at ' + businessHours[index] + ': ' + this.numOfCookiesForEveryHour[index]);

    this.totalDailyCookies += numberOfCookies;
    console.log('Total number of cookies for ' + this.storeName + ' as far as ' + businessHours[index] + ': ' + this.totalDailyCookies);
  }
};

// Create table data on html file
Store.prototype.render = function() {
  // appends store name to row element
  rowEl = document.createElement('tr');
  var tdEl = document.createElement('td');
  tdEl.textContent = this.storeName;
  rowEl.appendChild(tdEl);

  // appends store data to row element
  for (var i = 0; i < this.numOfCookiesForEveryHour.length; i++) {
    tdEl = document.createElement('td');
    tdEl.textContent = this.numOfCookiesForEveryHour[i];
    rowEl.appendChild(tdEl);
  }

  // append store's total number of cookies
  tdEl = document.createElement('td');
  tdEl.textContent = this.totalDailyCookies;
  rowEl.appendChild(tdEl);

  tableEl.appendChild(rowEl); // add row element to table
};

creatTable(); //create Table

// create 1st And Pike Store
var firstAndPike = new Store('1st And Pike', 23, 65, 6.3);
firstAndPike.calculateNumOfCookiesPerHour();
firstAndPike.render();

// create SeaTac Airport Store
var seaTac = new Store('SeaTac Airport', 3, 24, 1.2);
seaTac.calculateNumOfCookiesPerHour();
seaTac.render();

// create Seattle Center Store
var seattleCenter = new Store('Seattle Center', 11, 38, 3.7);
seattleCenter.calculateNumOfCookiesPerHour();
seattleCenter.render();

// create Capitol Hill Store
var capitolHill = new Store('Capitol Hill', 20, 38, 2.3);
capitolHill.calculateNumOfCookiesPerHour();
capitolHill.render();

// create Alki Store
var alki = new Store('Alki', 2, 16, 4.6);
alki.calculateNumOfCookiesPerHour();
alki.render();
