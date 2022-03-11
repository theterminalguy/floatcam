import React from "react";
import logo from "./logo.svg";
// import "./App.css";

const roundFloat = (float) => {
  return Number(parseFloat(float).toFixed(2));
};

const calculateMarkupInPercent = (supplyPrice, retailPrice) => {
  const supplyPriceFloat = roundFloat(supplyPrice);
  const retailPriceFloat = roundFloat(retailPrice);
  const markup =
    ((retailPriceFloat - supplyPriceFloat) / supplyPriceFloat) * 100;
  return roundFloat(markup);
};

class FormInput extends React.Component {
  state = {
    fieldName: "",
    supplyPrice: this.props.supplyPrice,
    markup: calculateMarkupInPercent(
      this.props.supplyPrice,
      this.props.retailPrice
    ),
    retailPrice: this.props.retailPrice,
  };

  calculateRetailPrice = (supplyPrice, markup) => {
    // if markup is 0, return supplyPrice
    // TODO: look at this
    if (markup === 0) {
      return supplyPrice;
    }
    return supplyPrice + (supplyPrice * markup) / 100;
  };

  handleChange = (e) => {
    const { target } = e;

    if (target.name === "markup") {
      const markup = roundFloat(target.value);
      // convert markup to decimal percentage
      // then get the dollar amount of the markup from the supply price
      // finally add that to the supply price to get the retail price
      const retailPrice =
        (markup / 100) * this.state.supplyPrice + this.state.supplyPrice;
      this.setState({
        fieldName: target.name,
        markup: roundFloat(target.value),
        retailPrice,
      });
    } else {
      this.setState({
        fieldName: target.name,
        markup: calculateMarkupInPercent(this.state.supplyPrice, target.value),
        retailPrice: roundFloat(target.value),
      });
    }
  };

  render() {
    console.log(
      calculateMarkupInPercent(this.state.supplyPrice, this.state.retailPrice)
    );

    return (
      <div>
        <h1>Two Way Edit</h1>
        <h2>You changed {this.state.fieldName}</h2>

        <div>
          <label>Product</label>
          <span>MacBook pro</span>
        </div>

        <div>
          <label>Price</label>
          <span>${this.state.supplyPrice}</span>
        </div>
        <div>
          <label>Markup(%) </label>
          <input
            type="number"
            name="markup"
            value={this.state.markup}
            onChange={this.handleChange}
          />
        </div>

        <div>
          <label>Retail Price($) </label>
          <input
            type="number"
            name="retailPrice"
            value={this.state.retailPrice}
            onChange={this.handleChange}
          />
        </div>
      </div>
    );
  }
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img
          src={logo}
          className="App-logo"
          alt="logo"
          width="100px"
          height="100px"
        />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>

      <FormInput supplyPrice={45} retailPrice={90} />
    </div>
  );
}

export default App;
