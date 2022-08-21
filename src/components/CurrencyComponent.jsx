import React from 'react';

function CurrencyComponent(props) {
  const {
    currencyChoice,
    selectedCurrency,
    changeCurrency,
    amount,
    changeAmount,
  } = props;
  return (
    <div className="d-flex w-100 my-5">
      <select
        value={selectedCurrency}
        onChange={changeCurrency}
        className="form-select form-select-sm w-20"
      >
        {currencyChoice.map((item, index) => {
          return <option key={index}>{item}</option>;
        })}
      </select>
      <input
        className="form-control text-end"
        type="number"
        value={amount}
        onChange={changeAmount}
      ></input>
    </div>
  );
}

export default CurrencyComponent;
