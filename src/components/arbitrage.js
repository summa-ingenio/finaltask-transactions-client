import React, { useState, useEffect } from "react";
import "../pricing.css";

const ArbitrageComponent = () => {
  const [krakenPrice, setKrakenPrice] = useState(null);
  const [arbitrageRate, setArbitrageRate] = useState(null);
  const [lunoPrice, setLunoPrice] = useState(null);

  useEffect(() => {
    // Fetch Kraken price
    fetch("http://localhost:5013/kraken-price")
      .then((response) => response.json())
      .then((data) => setKrakenPrice(data.krakenPrice))
      .catch((error) => console.error("Error fetching Kraken price:", error));

    // Fetch Arbitrage rate
    fetch("http://localhost:5013/arbitrage-rate")
      .then((response) => response.json())
      .then((data) => setArbitrageRate(data.arbitrageRate))
      .catch((error) => console.error("Error fetching Arbitrage rate:", error));

    // Fetch Luno price
    fetch("http://localhost:5013/luno-price")
      .then((response) => response.json())
      .then((data) => setLunoPrice(data.lunoPrice))
      .catch((error) => console.error("Error fetching Luno price:", error));
  }, []);

  //Display the abitrage rate on the front end
  return (
    <div className="pricing">
      <div className="card">
        <h2>
          USDXBT Price:{" "}
          {krakenPrice ? `$${krakenPrice.toFixed(2)}` : "Loading..."}
        </h2>
      </div>
      <div className="card">
        <h2>
          Arbitrage Rate:{" "}
          {arbitrageRate ? `${arbitrageRate.toFixed(2)}%` : "Loading..."}
        </h2>
      </div>
      <div className="card">
        <h2>
          ZARXBT Price: {lunoPrice ? `R${lunoPrice.toFixed(2)}` : "Loading..."}
        </h2>
      </div>
    </div>
  );
};

export default ArbitrageComponent;
