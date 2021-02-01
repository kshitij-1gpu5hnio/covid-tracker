import React, { useState, useEffect } from "react";
import "../../styles/styles.css";
import Base from "./Base";
import Card from "./Card";
import Table from "./Table";
import { getCountryData, getStatesData } from "./helper/coreapicalls";

const Home = () => {
  const [country, setCountry] = useState({});
  const [states, setStates] = useState([]);
  const [error, setError] = useState("");

  const loadCountryData = () => {
    getCountryData().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setCountry(data[0]);
        if(data[0].isStale) {
          setError(`covid19india API is down, data retrieved from the server is stale, source last updated at ${new Date(data[0].source_updated_at).toString()}.`);
        }
      }
    });
  };

  const loadStatesData = () => {
    getStatesData().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setStates(data);
      }
    })
  };

  useEffect(() => {
    loadCountryData();
    loadStatesData();
  }, []);

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };

  return (
    <Base
      title="Covid Tracker India"
      desciption="A personal project to track the coronavirus in India. Detailed country stats shows the extent of the coronavirus outbreak in different states."
      className="container"
    >
      {errorMessage()}
      <div className="row">
        <div className="col-3">
          <Card
            className="card text-center text-white bg-danger mb-3"
            header="Confirmed"
            cardTitle={country.confirmed}
            desc="Total No of Confirmed Cases"
          />
        </div>
        <div className="col-3">
          <Card
            className="card text-center text-white bg-primary mb-3"
            header="Active"
            cardTitle={country.active}
            desc="Total No of Active Cases"
          />
        </div>
        <div className="col-3">
          <Card
            className="card text-center text-white bg-success mb-3"
            header="Recovered"
            cardTitle={country.recovered}
            desc="Total No of Recovered Cases"
          />
        </div>
        <div className="col-3">
          <Card
            className="card text-center text-white bg-secondary mb-3"
            header="Deceased"
            cardTitle={country.deceased}
            desc="Total No of Deceased"
          />
        </div>
      </div>
      <Table states={states} />
    </Base>
  );
};

export default Home;
