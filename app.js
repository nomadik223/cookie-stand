'use strict';

var businessHours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'];

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
  var tableEl = document.getElementById('cookie-table');
  var rowEl = document.createElement('tr');
  var tableHeadEl = document.createElement('th'); //create empty first column
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

var firstAndPike = new Store('1st And Pike', 23, 65, 6.3);
firstAndPike.calculateNumOfCookiesPerHour();
firstAndPike.render();

// /************************* First And Pike Store *******************************/
// var firstAndPike = {
//   minCustomersPerHour: 23,
//   maxCustomersPerHour: 65,
//   avgCookiesPerCustomer: 6.3,
//   // [<hour>, <random number of custmmers for hour>, <number of cookies for hour>]
//   numOfCookiesForEachHourArray: [['6am', 0, 0.0], ['7am',0, 0.0], ['8am', 0, 0.0],
//   ['9am', 0, 0.0], ['10am', 0, 0.0], ['11am', 0, 0.0], ['12pm', 0, 0.0], ['1pm', 0, 0.0],
//   ['2pm', 0, 0.0], ['3pm', 0, 0.0], ['4pm', 0, 0.0], ['5pm', 0, 0.0], ['6pm', 0, 0.0],
//   ['7pm', 0, 0.0], ['8pm', 0, 0.0]],
//   randomCustomerIndex: 1,
//   numOfCookiesIndex: 2,
//
//   genRandomNumOfCustomers: function () {
//     for (var i = 0; i < this.numOfCookiesForEachHourArray.length; i++) {
//       this.numOfCookiesForEachHourArray[i][this.randomCustomerIndex] = Math.floor(Math.random() * (this.maxCustomersPerHour - this.minCustomersPerHour)) + this.minCustomersPerHour;
//     }
//   },
//   calculateNumOfCookiesPerHour: function() {
//     for (var i = 0; i < this.numOfCookiesForEachHourArray.length; i++) {
//       // num of cookies for hour = random number of customers for hour * avg number of cookies per customer
//       this.numOfCookiesForEachHourArray[i][this.numOfCookiesIndex] = Math.floor(this.numOfCookiesForEachHourArray[i][this.randomCustomerIndex] * this.avgCookiesPerCustomer);
//       console.log('typeof numOfCookiesIndex: ' + typeof this.numOfCookiesForEachHourArray[i][this.numOfCookiesIndex]);
//       console.log(this.numOfCookiesForEachHourArray[i][0] + ': ' + this.numOfCookiesForEachHourArray[i][this.randomCustomerIndex] + ' ' + this.numOfCookiesForEachHourArray[i][this.numOfCookiesIndex]);
//     }
//   }
// };
//
// //Display the values of each array as unordered lists in the browser
// firstAndPike.genRandomNumOfCustomers();
// firstAndPike.calculateNumOfCookiesPerHour();
//
// var firstAndPikeTotalCookies = 0.0;
// var firstAndPikeCookiesUl = document.getElementById('1st-pike-ul'); //get ul
// var listElement;
// console.log(firstAndPikeCookiesUl);
//
// for (var i = 0; i < firstAndPike.numOfCookiesForEachHourArray.length; i++) {
//   console.log('firstAndPikeTotalCookies Before: ' + firstAndPikeTotalCookies);
//   console.log('typeof firstAndPikeTotalCookies before: ' + typeof firstAndPikeTotalCookies);
//   firstAndPikeTotalCookies += firstAndPike.numOfCookiesForEachHourArray[i][firstAndPike.numOfCookiesIndex]; // add num of cookies
//   console.log('firstAndPikeTotalCookies After: ' + firstAndPikeTotalCookies);
//   console.log('typeof firstAndPikeTotalCookies after: ' + typeof firstAndPikeTotalCookies);
//   console.log(firstAndPike.numOfCookiesForEachHourArray[i]);
//   listElement = document.createElement('li'); // step 1
//   listElement.setAttribute('class', 'firstAndPikeCookiesListItems'); // step 2
//   listElement.textContent = firstAndPike.numOfCookiesForEachHourArray[i][0] + ': ' + firstAndPike.numOfCookiesForEachHourArray[i][firstAndPike.numOfCookiesIndex] + ' cookies';
//   firstAndPikeCookiesUl.appendChild(listElement); // step 3
// }
//
// // Create 'Total: ...' list item
// listElement = document.createElement('li'); // step 1
// listElement.setAttribute('class', 'firstAndPikeCookiesListItems'); // step 2
// listElement.textContent = 'Total: ' + firstAndPikeTotalCookies + ' cookies';
// firstAndPikeCookiesUl.appendChild(listElement); // step 3
//
// /************************** SeaTac Airport Store ******************************/
// var seaTacAirport = {
//   minCustomersPerHour: 3,
//   maxCustomersPerHour: 24,
//   avgCookiesPerCustomer: 1.2,
//   // [<hour>, <random number of custmmers for hour>, <number of cookies for hour>]
//   numOfCookiesForEachHourArray: [['6am', 0, 0.0], ['7am',0, 0.0], ['8am', 0, 0.0],
//   ['9am', 0, 0.0], ['10am', 0, 0.0], ['11am', 0, 0.0], ['12pm', 0, 0.0], ['1pm', 0, 0.0],
//   ['2pm', 0, 0.0], ['3pm', 0, 0.0], ['4pm', 0, 0.0], ['5pm', 0, 0.0], ['6pm', 0, 0.0],
//   ['7pm', 0, 0.0], ['8pm', 0, 0.0]],
//   randomCustomerIndex: 1,
//   numOfCookiesIndex: 2,
//
//   genRandomNumOfCustomers: function () {
//     for (var i = 0; i < this.numOfCookiesForEachHourArray.length; i++) {
//       this.numOfCookiesForEachHourArray[i][this.randomCustomerIndex] = Math.floor(Math.random() * (this.maxCustomersPerHour - this.minCustomersPerHour)) + this.minCustomersPerHour;
//     }
//   },
//   calculateNumOfCookiesPerHour: function() {
//     for (var i = 0; i < this.numOfCookiesForEachHourArray.length; i++) {
//       // num of cookies for hour = random number of customers for hour * avg number of cookies per customer
//       this.numOfCookiesForEachHourArray[i][this.numOfCookiesIndex] = Math.floor(this.numOfCookiesForEachHourArray[i][this.randomCustomerIndex] * this.avgCookiesPerCustomer);
//       console.log('typeof numOfCookiesIndex: ' + typeof this.numOfCookiesForEachHourArray[i][this.numOfCookiesIndex]);
//       console.log(this.numOfCookiesForEachHourArray[i][0] + ': ' + this.numOfCookiesForEachHourArray[i][this.randomCustomerIndex] + ' ' + this.numOfCookiesForEachHourArray[i][this.numOfCookiesIndex]);
//     }
//   }
// };
//
// //Display the values of each array as unordered lists in the browser
// seaTacAirport.genRandomNumOfCustomers();
// seaTacAirport.calculateNumOfCookiesPerHour();
//
// var seaTacAirportTotalCookies = 0.0;
// var seaTacAirportCookiesUl = document.getElementById('seatac-airport-ul'); //get ul
// var listElement;
// console.log(seaTacAirportCookiesUl);
//
// for (var i = 0; i < seaTacAirport.numOfCookiesForEachHourArray.length; i++) {
//   console.log('seaTacAirportTotalCookies Before: ' + seaTacAirportTotalCookies);
//   console.log('typeof seaTacAirportTotalCookies before: ' + typeof seaTacAirportTotalCookies);
//   seaTacAirportTotalCookies += seaTacAirport.numOfCookiesForEachHourArray[i][seaTacAirport.numOfCookiesIndex]; // add num of cookies
//   console.log('seaTacAirportTotalCookies After: ' + seaTacAirportTotalCookies);
//   console.log('typeof seaTacAirportTotalCookies after: ' + typeof seaTacAirportTotalCookies);
//   console.log(seaTacAirport.numOfCookiesForEachHourArray[i]);
//   listElement = document.createElement('li'); // step 1
//   listElement.setAttribute('class', 'seaTacAirportListItems'); // step 2
//   listElement.textContent = seaTacAirport.numOfCookiesForEachHourArray[i][0] + ': ' + seaTacAirport.numOfCookiesForEachHourArray[i][seaTacAirport.numOfCookiesIndex] + ' cookies';
//   seaTacAirportCookiesUl.appendChild(listElement); // step 3
// }
//
// // Create 'Total: ...' list item
// listElement = document.createElement('li'); // step 1
// listElement.setAttribute('class', 'seaTacAirportListItems'); // step 2
// listElement.textContent = 'Total: ' + seaTacAirportTotalCookies + ' cookies';
// seaTacAirportCookiesUl.appendChild(listElement); // step 3
//
// /************************* Seattle Center Store *******************************/
// var seattleCenter = {
//   minCustomersPerHour: 11,
//   maxCustomersPerHour: 38,
//   avgCookiesPerCustomer: 3.7,
//   // [<hour>, <random number of custmmers for hour>, <number of cookies for hour>]
//   numOfCookiesForEachHourArray: [['6am', 0, 0.0], ['7am',0, 0.0], ['8am', 0, 0.0],
//   ['9am', 0, 0.0], ['10am', 0, 0.0], ['11am', 0, 0.0], ['12pm', 0, 0.0], ['1pm', 0, 0.0],
//   ['2pm', 0, 0.0], ['3pm', 0, 0.0], ['4pm', 0, 0.0], ['5pm', 0, 0.0], ['6pm', 0, 0.0],
//   ['7pm', 0, 0.0], ['8pm', 0, 0.0]],
//   randomCustomerIndex: 1,
//   numOfCookiesIndex: 2,
//
//   genRandomNumOfCustomers: function () {
//     for (var i = 0; i < this.numOfCookiesForEachHourArray.length; i++) {
//       this.numOfCookiesForEachHourArray[i][this.randomCustomerIndex] = Math.floor(Math.random() * (this.maxCustomersPerHour - this.minCustomersPerHour)) + this.minCustomersPerHour;
//     }
//   },
//   calculateNumOfCookiesPerHour: function() {
//     for (var i = 0; i < this.numOfCookiesForEachHourArray.length; i++) {
//       // num of cookies for hour = random number of customers for hour * avg number of cookies per customer
//       this.numOfCookiesForEachHourArray[i][this.numOfCookiesIndex] = Math.floor(this.numOfCookiesForEachHourArray[i][this.randomCustomerIndex] * this.avgCookiesPerCustomer);
//       console.log('typeof numOfCookiesIndex: ' + typeof this.numOfCookiesForEachHourArray[i][this.numOfCookiesIndex]);
//       console.log(this.numOfCookiesForEachHourArray[i][0] + ': ' + this.numOfCookiesForEachHourArray[i][this.randomCustomerIndex] + ' ' + this.numOfCookiesForEachHourArray[i][this.numOfCookiesIndex]);
//     }
//   }
// };
//
// //Display the values of each array as unordered lists in the browser
// seattleCenter.genRandomNumOfCustomers();
// seattleCenter.calculateNumOfCookiesPerHour();
//
// var seattleCenterTotalCookies = 0.0;
// var seattleCenterCookiesUl = document.getElementById('seattle-center-ul'); //get ul
// var listElement;
// console.log(seattleCenterCookiesUl);
//
// for (var i = 0; i < seattleCenter.numOfCookiesForEachHourArray.length; i++) {
//   console.log('seattleCenterTotalCookies Before: ' + seattleCenterTotalCookies);
//   console.log('typeof seattleCenterTotalCookies before: ' + typeof seattleCenterTotalCookies);
//   seattleCenterTotalCookies += seattleCenter.numOfCookiesForEachHourArray[i][seattleCenter.numOfCookiesIndex]; // add num of cookies
//   console.log('seattleCenterTotalCookies After: ' + seattleCenterTotalCookies);
//   console.log('typeof seattleCenterTotalCookies after: ' + typeof seattleCenterTotalCookies);
//   console.log(seattleCenter.numOfCookiesForEachHourArray[i]);
//   listElement = document.createElement('li'); // step 1
//   listElement.setAttribute('class', 'seattleCenterListItems'); // step 2
//   listElement.textContent = seattleCenter.numOfCookiesForEachHourArray[i][0] + ': ' + seattleCenter.numOfCookiesForEachHourArray[i][seattleCenter.numOfCookiesIndex] + ' cookies';
//   seattleCenterCookiesUl.appendChild(listElement); // step 3
// }
//
// // Create 'Total: ...' list item
// listElement = document.createElement('li'); // step 1
// listElement.setAttribute('class', 'seattleCentertListItems'); // step 2
// listElement.textContent = 'Total: ' + seattleCenterTotalCookies + ' cookies';
// seattleCenterCookiesUl.appendChild(listElement); // step 3
//
// /************************** Capitol Hill Store ********************************/
// var capitolHill = {
//   minCustomersPerHour: 20,
//   maxCustomersPerHour: 38,
//   avgCookiesPerCustomer: 2.3,
//   // [<hour>, <random number of custmmers for hour>, <number of cookies for hour>]
//   numOfCookiesForEachHourArray: [['6am', 0, 0.0], ['7am',0, 0.0], ['8am', 0, 0.0],
//   ['9am', 0, 0.0], ['10am', 0, 0.0], ['11am', 0, 0.0], ['12pm', 0, 0.0], ['1pm', 0, 0.0],
//   ['2pm', 0, 0.0], ['3pm', 0, 0.0], ['4pm', 0, 0.0], ['5pm', 0, 0.0], ['6pm', 0, 0.0],
//   ['7pm', 0, 0.0], ['8pm', 0, 0.0]],
//   randomCustomerIndex: 1,
//   numOfCookiesIndex: 2,
//
//   genRandomNumOfCustomers: function () {
//     for (var i = 0; i < this.numOfCookiesForEachHourArray.length; i++) {
//       this.numOfCookiesForEachHourArray[i][this.randomCustomerIndex] = Math.floor(Math.random() * (this.maxCustomersPerHour - this.minCustomersPerHour)) + this.minCustomersPerHour;
//     }
//   },
//   calculateNumOfCookiesPerHour: function() {
//     for (var i = 0; i < this.numOfCookiesForEachHourArray.length; i++) {
//       // num of cookies for hour = random number of customers for hour * avg number of cookies per customer
//       this.numOfCookiesForEachHourArray[i][this.numOfCookiesIndex] = Math.floor(this.numOfCookiesForEachHourArray[i][this.randomCustomerIndex] * this.avgCookiesPerCustomer);
//       console.log('typeof numOfCookiesIndex: ' + typeof this.numOfCookiesForEachHourArray[i][this.numOfCookiesIndex]);
//       console.log(this.numOfCookiesForEachHourArray[i][0] + ': ' + this.numOfCookiesForEachHourArray[i][this.randomCustomerIndex] + ' ' + this.numOfCookiesForEachHourArray[i][this.numOfCookiesIndex]);
//     }
//   }
// };
//
// //Display the values of each array as unordered lists in the browser
// capitolHill.genRandomNumOfCustomers();
// capitolHill.calculateNumOfCookiesPerHour();
//
// var capitolHillTotalCookies = 0.0;
// var capitolHillCookiesUl = document.getElementById('capitol-hill-ul'); //get ul
// var listElement;
// console.log(capitolHillCookiesUl);
//
// for (var i = 0; i < capitolHill.numOfCookiesForEachHourArray.length; i++) {
//   console.log('capitolHillTotalCookies Before: ' + capitolHillTotalCookies);
//   console.log('typeof capitolHillTotalCookies before: ' + typeof capitolHillTotalCookies);
//   capitolHillTotalCookies += capitolHill.numOfCookiesForEachHourArray[i][capitolHill.numOfCookiesIndex]; // add num of cookies
//   console.log('capitolHillTotalCookies After: ' + capitolHillTotalCookies);
//   console.log('typeof capitolHillTotalCookies after: ' + typeof capitolHillTotalCookies);
//   console.log(capitolHill.numOfCookiesForEachHourArray[i]);
//   listElement = document.createElement('li'); // step 1
//   listElement.setAttribute('class', 'capitolHillListItems'); // step 2
//   listElement.textContent = capitolHill.numOfCookiesForEachHourArray[i][0] + ': ' + capitolHill.numOfCookiesForEachHourArray[i][capitolHill.numOfCookiesIndex] + ' cookies';
//   capitolHillCookiesUl.appendChild(listElement); // step 3
// }
//
// // Create 'Total: ...' list item
// listElement = document.createElement('li'); // step 1
// listElement.setAttribute('class', 'capitolHillListItems'); // step 2
// listElement.textContent = 'Total: ' + capitolHillTotalCookies + ' cookies';
// capitolHillCookiesUl.appendChild(listElement); // step 3
//
// /****************************** Alki Store ************************************/
// var alki = {
//   minCustomersPerHour: 2,
//   maxCustomersPerHour: 16,
//   avgCookiesPerCustomer: 4.6,
//   // [<hour>, <random number of custmmers for hour>, <number of cookies for hour>]
//   numOfCookiesForEachHourArray: [['6am', 0, 0.0], ['7am',0, 0.0], ['8am', 0, 0.0],
//   ['9am', 0, 0.0], ['10am', 0, 0.0], ['11am', 0, 0.0], ['12pm', 0, 0.0], ['1pm', 0, 0.0],
//   ['2pm', 0, 0.0], ['3pm', 0, 0.0], ['4pm', 0, 0.0], ['5pm', 0, 0.0], ['6pm', 0, 0.0],
//   ['7pm', 0, 0.0], ['8pm', 0, 0.0]],
//   randomCustomerIndex: 1,
//   numOfCookiesIndex: 2,
//
//   genRandomNumOfCustomers: function () {
//     for (var i = 0; i < this.numOfCookiesForEachHourArray.length; i++) {
//       this.numOfCookiesForEachHourArray[i][this.randomCustomerIndex] = Math.floor(Math.random() * (this.maxCustomersPerHour - this.minCustomersPerHour)) + this.minCustomersPerHour;
//     }
//   },
//   calculateNumOfCookiesPerHour: function() {
//     for (var i = 0; i < this.numOfCookiesForEachHourArray.length; i++) {
//       // num of cookies for hour = random number of customers for hour * avg number of cookies per customer
//       this.numOfCookiesForEachHourArray[i][this.numOfCookiesIndex] = Math.floor(this.numOfCookiesForEachHourArray[i][this.randomCustomerIndex] * this.avgCookiesPerCustomer);
//       console.log('typeof numOfCookiesIndex: ' + typeof this.numOfCookiesForEachHourArray[i][this.numOfCookiesIndex]);
//       console.log(this.numOfCookiesForEachHourArray[i][0] + ': ' + this.numOfCookiesForEachHourArray[i][this.randomCustomerIndex] + ' ' + this.numOfCookiesForEachHourArray[i][this.numOfCookiesIndex]);
//     }
//   }
// };
//
// //Display the values of each array as unordered lists in the browser
// alki.genRandomNumOfCustomers();
// alki.calculateNumOfCookiesPerHour();
//
// var alkiTotalCookies = 0.0;
// var alkiCookiesUl = document.getElementById('alki-ul'); //get ul
// var listElement;
// console.log(alkiCookiesUl);
//
// for (var i = 0; i < alki.numOfCookiesForEachHourArray.length; i++) {
//   console.log('alkiTotalCookies Before: ' + alkiTotalCookies);
//   console.log('typeof alkiTotalCookies before: ' + typeof alkiTotalCookies);
//   alkiTotalCookies += alki.numOfCookiesForEachHourArray[i][alki.numOfCookiesIndex]; // add num of cookies
//   console.log('alkilTotalCookies After: ' + alkiTotalCookies);
//   console.log('typeof alkiTotalCookies after: ' + typeof alkiTotalCookies);
//   console.log(alki.numOfCookiesForEachHourArray[i]);
//   listElement = document.createElement('li'); // step 1
//   listElement.setAttribute('class', 'alkiListItems'); // step 2
//   listElement.textContent = alki.numOfCookiesForEachHourArray[i][0] + ': ' + alki.numOfCookiesForEachHourArray[i][alki.numOfCookiesIndex] + ' cookies';
//   alkiCookiesUl.appendChild(listElement); // step 3
// }
//
// // Create 'Total: ...' list item
// listElement = document.createElement('li'); // step 1
// listElement.setAttribute('class', 'alkiListItems'); // step 2
// listElement.textContent = 'Total: ' + alkiTotalCookies + ' cookies';
// alkiCookiesUl.appendChild(listElement); // step 3
