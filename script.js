const currencyEl_one = document.querySelector('#currency-one');
const amountEl_one = document.querySelector('#amount-one');
const currencyEl_two = document.querySelector('#currency-two');
const amountEl_two = document.querySelector('#amount-two');
const APIKey = '5de850d42885426b63b13016';

const queryUrl = `https://v6.exchangerate-api.com/v6/${APIKey}/latest/`;

const rateEl = document.querySelector('#rate');
const swap = document.querySelector('#swap');


//Fetch exchange rates and update the DOM
function calculateExchange() {
    const currency_one = currencyEl_one.value;
    const currency_two = currencyEl_two.value;

    fetch(`${queryUrl}${currency_one}`)
        .then(response => response.json())
        .then(data => {
            const rate = data.conversion_rates[currency_two];
            console.log(rate);
            rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;
            amountEl_two.value = (amountEl_one.value * rate).toFixed(2);
        })

}

//Event Listener 
currencyEl_one.addEventListener('change', calculateExchange);
amountEl_one.addEventListener('input', calculateExchange);
currencyEl_two.addEventListener('change', calculateExchange);
amountEl_two.addEventListener('input', calculateExchange);


swap.addEventListener('click', () => {
    const temp = currencyEl_one.value;
    currencyEl_one.value = currencyEl_two.value;
    currencyEl_two.value = temp;
    calculateExchange();
});

calculateExchange();