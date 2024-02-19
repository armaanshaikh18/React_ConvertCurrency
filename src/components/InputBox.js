import React, { useState, useEffect } from "react";
import "./InputBox.css";
const Currency = () => {
  const [data, setData] = useState({
    dd: [],
    val: {},
  });
  const [currency, setCurrency] = useState({
    from: "inr",
    to: "djf",
  });
  const [amount, setAmount] = useState({
    user: 0,
    final: 0,
  });
  const handleChange = (name, value) => {
    setCurrency((prev) => ({ ...prev, [name]: value }));
    console.log("first", name, value);
  };
  useEffect(() => {
    fetch(
      `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${currency.from}.json`
    )
      .then((res) => res.json())
      .then((res) =>
        setData({
          dd: Object.keys(res[currency.from]),
          val: res[currency.from],
        })
      );
  }, [currency.from]);
  const onSubmit = (e) => {
    e.preventDefault();
    if (data.dd.length === 0) {
      return;
    }
    const final = amount.user * data.val[currency.to];
    setAmount((prev) => ({ ...prev, final }));
  };
  const handleSwap = (e) => {
    e.preventDefault();
    let temp = currency;
    setCurrency({
      to: temp.from,
      from: temp.to,
    });
    setAmount({
      user: 0,
      final: 0,
    });
  };
  return (
    <>
      <div className="card">
        <h1 className="form_h1">Currency Converter</h1>
        <form className="form_data">
          <label className="form_label">Amount:</label>
          <input
            id="curr"
            value={amount.user}
            onChange={(e) =>
              setAmount((prev) => ({ ...prev, user: e.target.value }))
            }
            type="number"
          />

          <label className="form_label">From:</label>
          <select
            name="from"
            id="curr"
            value={currency.from}
            onChange={(e) => handleChange("from", e.target.value)}
          >
            {data.dd &&
              data.dd.map((crr) => <option value={crr}>{crr}</option>)}
          </select>
          <button className="btn_swap" onClick={handleSwap}>
            Swap
          </button>
          <label className="form_label">To:</label>
          <select
            name="to"
            id="curr"
            value={currency.to}
            onChange={(e) => handleChange("to", e.target.value)}
          >
            {data.dd &&
              data.dd.map((crr) => <option value={crr}>{crr}</option>)}
          </select>
          <button className="form_btn" onClick={onSubmit}>
            Convert
          </button>
        </form>

        <div className="convert_amt">
          <h1>Converted Amount :</h1>
          <span>
            Your value is : {amount.final.toFixed(2)} {currency.to}{" "}
          </span>
        </div>
      </div>
    </>
  );
};

export default Currency;
