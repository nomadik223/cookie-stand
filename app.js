'use strict';

/************************* FIRST AND PIKE STORE *******************************/
var firstAndPike = {
  minCustomersPerHour: 23,
  maxCustomersPerHour: 65,
  avgCookiesPerCustomer: 6.3,
  // [<hour>, <random number of custmmers for hour>, <number of cookies for hour>]
  numOfCookiesForEachHourArray: [['6am', 0, 0.0], ['7am',0, 0.0], ['8am', 0, 0.0],
  ['9am', 0, 0.0], ['10am', 0, 0.0], ['11am', 0, 0.0], ['12pm', 0, 0.0], ['1pm', 0, 0.0],
  ['2pm', 0, 0.0], ['3pm', 0, 0.0], ['4pm', 0, 0.0], ['5pm', 0, 0.0], ['6pm', 0, 0.0],
  ['7pm', 0, 0.0], ['8pm', 0, 0.0]],
  randomCustomerIndex: 1,
  numOfCookiesIndex: 2,

  genRandomNumOfCustomers: function () {
    for (var i = 0; i < this.numOfCookiesForEachHourArray.length; i++) {
      this.numOfCookiesForEachHourArray[i][this.randomCustomerIndex] = Math.floor(Math.random() * (this.maxCustomersPerHour - this.minCustomersPerHour)) + this.minCustomersPerHour;
    }
  },
  calculateNumOfCookiesPerHour: function() {
    for (var i = 0; i < this.numOfCookiesForEachHourArray.length; i++) {
      // num of cookies for hour = random number of customers for hour * avg number of cookies per customer
      this.numOfCookiesForEachHourArray[i][this.numOfCookiesIndex] = Math.floor(this.numOfCookiesForEachHourArray[i][this.randomCustomerIndex] * this.avgCookiesPerCustomer);
      console.log('typeof numOfCookiesIndex: ' + typeof this.numOfCookiesForEachHourArray[i][this.numOfCookiesIndex]);
      console.log(this.numOfCookiesForEachHourArray[i][0] + ': ' + this.numOfCookiesForEachHourArray[i][this.randomCustomerIndex] + ' ' + this.numOfCookiesForEachHourArray[i][this.numOfCookiesIndex]);
    }
  }
};

//Display the values of each array as unordered lists in the browser
firstAndPike.genRandomNumOfCustomers();
firstAndPike.calculateNumOfCookiesPerHour();

var firstAndPikeTotalCookies = 0.0;
var firstAndPikeCookiesUl = document.getElementById('1st-pike-ul'); //get ul
var listElement;
console.log(firstAndPikeCookiesUl);

for (var i = 0; i < firstAndPike.numOfCookiesForEachHourArray.length; i++) {
  console.log('firstAndPikeTotalCookies Before: ' + firstAndPikeTotalCookies);
  console.log('typeof firstAndPikeTotalCookies before: ' + typeof firstAndPikeTotalCookies);
  firstAndPikeTotalCookies += firstAndPike.numOfCookiesForEachHourArray[i][this.numOfCookiesIndex]; // add num of cookies
  console.log('firstAndPikeTotalCookies After: ' + firstAndPikeTotalCookies);
  console.log('typeof firstAndPikeTotalCookies after: ' + typeof firstAndPikeTotalCookies);
  console.log(firstAndPike.numOfCookiesForEachHourArray[i]);
  listElement = document.createElement('li'); // step 1
  listElement.setAttribute('class', 'firstAndPikeCookiesListItems'); // step 2
  listElement.textContent = firstAndPike.numOfCookiesForEachHourArray[i][0] + ': ' + firstAndPike.numOfCookiesForEachHourArray[i][firstAndPike.numOfCookiesIndex] + ' cookies';
  firstAndPikeCookiesUl.appendChild(listElement); // step 3
}

// Create 'Total: ...' list item
listElement = document.createElement('li'); // step 1
listElement.setAttribute('class', 'firstAndPikeCookiesListItems'); // step 2
listElement.textContent = 'Total: ' + firstAndPikeTotalCookies + ' cookies';
firstAndPikeCookiesUl.appendChild(listElement); // step 3

/**************************** SeaTac Airport **********************************/
