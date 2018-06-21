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
  document.getElementById('exchange').value = '';
};

const addPair = function addPair() {
  const pair = document.getElementById('pair').value;
  if (pair) {
    pairs.push(pair);
  }
  document.getElementById('pair').value = '';
};

const createElementWithText = (name, value) => {
  const element = document.createElement(name);
  const nodeText = document.createTextNode(value);
  element.appendChild(nodeText);
  return element;
};

const fillTable = (coins) => {
  const table = document.createElement('TABLE');
  let tr = document.createElement('TR');
  tr.appendChild(createElementWithText('TH', 'Id'));
  tr.appendChild(createElementWithText('TH', 'Name'));
  tr.appendChild(createElementWithText('TH', 'Symbol'));
  tr.appendChild(createElementWithText('TH', 'Market Cap'));
  tr.appendChild(createElementWithText('TH', 'Circulating Supply(USD)'));
  tr.appendChild(createElementWithText('TH', 'Price(USD)'));
  tr.appendChild(createElementWithText('TH', 'Last Update'));
  table.appendChild(tr);
  coins.forEach((coin) => {
    let tr = document.createElement('TR');
    const values = [];
    values.push(coin.id);
    values.push(coin.name);
    values.push(coin.symbol);
    values.push(coin.market_cap);
    values.push(coin.circulating_supply);
    values.push(coin.price);
    values.push(coin.last_updated);
    values.forEach((value) => {
      tr.appendChild(createElementWithText('TD', value));
    });
    table.appendChild(tr);
  });
  document.getElementById('table').appendChild(table);
};


const searchCoins = async function () {
  const from = document.getElementById('from').value;
  const to = document.getElementById('to').value;
  document.getElementById('from').value = '';
  document.getElementById('to').value = '';
  const range = {};
  if (from && from !== '') {
    range.from = from;
  }
  if (to && to !== '') {
    range.to = to;
  }

  const makeRequest = await fetch('api/coins', {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ range: range, markets: markets, pairs: pairs }),
    // body: { range, markets, pairs },
  });
  const coins = await makeRequest.json();
  fillTable(coins.coins);
  markets = [];
  pairs = [];
};

