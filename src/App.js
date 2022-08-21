import axios from 'axios';
import { useEffect, useState } from 'react';
import CurrencyComponent from './components/CurrencyComponent.jsx';
import FooterComponent from './components/FooterComponent.jsx';

function App() {
  //API = https://api.exchangerate.host/latest
  //CONVERT = https://api.exchangerate.host/convert?from=THB&to=USD
  const [currencyChoice, setCurrencyChoice] = useState([]);

  const [fromCurrency, setFormCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('THB');

  const [amount, setAmount] = useState(1);
  const [exchangeRate, setExchangeRate] = useState(0);

  const [checkFormCurrency, setCheckFormCurrency] = useState(true);

  let fromAmount, toAmount;

  if (checkFormCurrency) {
    fromAmount = amount;
    toAmount = (fromAmount * exchangeRate).toFixed(2);
  } else {
    toAmount = amount;
    fromAmount = (toAmount / exchangeRate).toFixed(2);
  }

  const url = `https://api.exchangerate.host/latest?base=${fromCurrency}`;
  useEffect(() => {
    axios.get(url).then((res) => {
      const rates = res.data.rates;
      setCurrencyChoice([...Object.keys(rates)]);
      setExchangeRate(rates[toCurrency]);
    });
  }, [url, toCurrency]);

  const amountFromCurrency = (e) => {
    setCheckFormCurrency(true);
    setAmount(e.target.value);
  };

  const amountToCurrency = (e) => {
    setCheckFormCurrency(false);
    setAmount(e.target.value);
  };

  // let qs = 'name=Codecamp&version=10';
  // const qsToObj = (qs) => {
  //   let params = new URLSearchParams(qs);
  //   let entries = params.entries();
  //   return Object.fromEntries(entries);
  // };
  // console.log(qsToObj(qs));

  return (
    <>
      <div className="container w-50 text-center">
        <h1>Currency Exchange</h1>
        <img
          src="https://i.kym-cdn.com/entries/icons/mobile/000/029/959/Screen_Shot_2019-06-05_at_1.26.32_PM.jpg"
          class="rounded w-75 mt-5"
          alt="..."
        ></img>
        <div>
          <CurrencyComponent
            currencyChoice={currencyChoice}
            selectedCurrency={fromCurrency}
            changeCurrency={(e) => setFormCurrency(e.target.value)}
            amount={fromAmount}
            changeAmount={amountFromCurrency}
          />
          <h1> = </h1>
          <CurrencyComponent
            currencyChoice={currencyChoice}
            selectedCurrency={toCurrency}
            changeCurrency={(e) => setToCurrency(e.target.value)}
            amount={toAmount}
            changeAmount={amountToCurrency}
          />
        </div>
      </div>
      <div className="fixed-bottom">
        <FooterComponent />
      </div>
    </>
  );
}

export default App;
