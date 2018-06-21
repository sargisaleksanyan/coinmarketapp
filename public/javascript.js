/* eslint-disable no-undef */
let markets = [];
let pairs = [];
function autocomplete(inp, arr) {
  let currentFocus;

  inp.addEventListener('input', function(e) {
    let a = this.value;
    let b = this.value;
    let i = this.value;
    const val = this.value;
    closeAllLists();
    if (!val) { return false;}
    currentFocus = -1;
    a = document.createElement('DIV');
    a.setAttribute('id', this.id + 'autocomplete-list');
    a.setAttribute('class', 'autocomplete-items');
    this.parentNode.appendChild(a);
    for (i = 0; i < arr.length; i++) {
      if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
        b = document.createElement('DIV');
        /* make the matching letters bold: */
        b.innerHTML = '<strong>' + arr[i].substr(0, val.length) + "</strong>";
        b.innerHTML += arr[i].substr(val.length);
        /* insert a input field that will hold the current array item's value: */
        b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
        /* execute a function when someone clicks on the item value (DIV element): */
        b.addEventListener('click', function(e) {
        /* insert the value for the autocomplete text field: */
          inp.value = this.getElementsByTagName('input')[0].value;
          /* close the list of autocompleted values,
          (or any other open lists of autocompleted values: */
          closeAllLists();
        });
        a.appendChild(b);
      }
    }
  });

  inp.addEventListener('keydown', function(e) {
    let x = document.getElementById(this.id + 'autocomplete-list');
    if (x) x = x.getElementsByTagName('div');
    if (e.keyCode === 40) {
      currentFocus++;

      addActive(x);
    } else if (e.keyCode === 38) {
      addActive(x);
    } else if (e.keyCode === 13) {
      e.preventDefault();
      if (currentFocus > -1) {
        if (x) x[currentFocus].click();
      }
    }
  });
  function addActive(x) {
    /* a function to classify an item as "active": */
    if (!x) return false;
    /* start by removing the "active" class on all items: */
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /* add class "autocomplete-active": */
    x[currentFocus].classList.add('autocomplete-active');
  }
  function removeActive(x) {
    /* a function to remove the "active" class from all autocomplete items: */
    for (let i = 0; i < x.length; i++) {
      x[i].classList.remove('autocomplete-active');
    }
  }
  function closeAllLists(elmnt) {
    /* close all autocomplete lists in the document,
    except the one passed as an argument: */
    let x = document.getElementsByClassName('autocomplete-items');
    for (let i = 0; i < x.length; i++) {
      if (elmnt !== x[i] && elmnt !== inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /* execute a function when someone clicks in the document: */
  document.addEventListener('click',  (e) => {
    closeAllLists(e.target);
  });
}

const makePairAutoComplete = async () => {
  const pairsResponse = await fetch('api/coins/pairs');
  const pairs =  await pairsResponse.json();
  autocomplete(document.getElementById('pair'), pairs.pairs);
};
const makeExchangesAutoComplete = async () => {
  const exchangeResponse = await fetch('api/coins/exchanges');
  const exchanges = await exchangeResponse.json();
  autocomplete(document.getElementById('exchange'), exchanges.exchanges);
};
makePairAutoComplete();

makeExchangesAutoComplete();

const addMarket = function addMarket() {
  const exchange = document.getElementById('exchange').value;
  if (exchange) {
    markets.push(exchange);
  }
};
const addPair = function addPair() {
  const pair = document.getElementById('pair').value;
  if (pair) {
    pairs.push(pair);
  }
};
const searchCoins = function () {
  
}