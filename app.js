'use strict';

// Holds business hours in array
var businessHours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'];

var tableEl, tHeaderEl, tFooterEl, rowEl, tableHeadingEl, tdEl;

function creatTableHeader() {
  tableEl = document.getElementById('cookie-table');
  tHeaderEl = document.createElement('thead');
  rowEl = document.createElement('tr');
  tableHeadingEl = document.createElement('th'); //create empty first column
  rowEl.appendChild(tableHeadingEl);

  // create business hours columns
  for (var i = 0; i < businessHours.length; i++) {
    tableHeadingEl = document.createElement('th');
    tableHeadingEl.textContent = businessHours[i];
    rowEl.appendChild(tableHeadingEl); // add th elemet to row
  }

  // create daily location total column
  tableHeadingEl = document.createElement('th');
  tableHeadingEl.textContent = 'Daily Location Total';
  rowEl.appendChild(tableHeadingEl); // add th element to row
  tHeaderEl.appendChild(rowEl);
  tableEl.appendChild(tHeaderEl); // add row element to table
}

function createTableFooter() {
  tFooterEl = document.createElement('tfoot');
  rowEl = document.createElement('tr');
  tdEl = document.createElement('td');
  tdEl.textContent = 'Totals';
  rowEl.appendChild(tdEl);

  // create footer table data. blank for now
  for (var i = 0; i < businessHours.length; i++) {
    tdEl = document.createElement('td');
    rowEl.appendChild(tdEl);
  }

  tFooterEl.appendChild(rowEl);
  tableEl.appendChild(tFooterEl);
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
  tdEl = document.createElement('td');
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

var formEl = document.getElementById('form-section');

formEl.addEventListener('submit', function(event){
  event.preventDefault();
  event.stopPropagation();

  var storeName = event.target.storeName.value;
  console.log('Store name: ' + storeName);
  var minCustPerHour = event.target.minCustomersPerHour.value;
  console.log('Minimum customers per hour: ' + minCustPerHour);
  var maxCustPerHour = event.target.maxCustomersPerHour.value;
  console.log('Maximum customers per hour: ' + maxCustPerHour);
  var avgCookiesPerCust = event.target.avgCookiesPerCustomer.value;
  console.log('Average cookies per customer: ' + avgCookiesPerCust);

  var newStore = new Store(storeName, minCustPerHour, maxCustPerHour, avgCookiesPerCust);

  newStore.calculateNumOfCookiesPerHour();
  newStore.render();
}, false);

creatTableHeader();

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

createTableFooter();
