import React , {useState, useEffect} from "react";
import "../../styles/styles.css";
import Base from "./Base";
import Card from "./Card";
import DistrictTable from "./DistrictTable";
import { loadStateFromStorage } from "./helper/storagehelper";

const State = () => {

  const [stateData, setStateData] = useState([]);

  useEffect(() => {
    setStateData(loadStateFromStorage());
  }, []);

  return (
    <Base
      title={`Covid Tracker ${stateData.state}`} 
      desciption="A personal project to track the coronavirus in India. Detailed country stats shows the extent of the coronavirus outbreak in different states."
      className="container"
    >
      <div className="row">
        <div className="col-3">
          <Card
            className="card text-center text-white bg-danger mb-3"
            header="Confirmed"
            cardTitle= {stateData.confirmed}
            desc="Total No of Confirmed Cases"
          />
        </div>
        <div className="col-3">
          <Card
            className="card text-center text-white bg-primary mb-3"
            header="Active"
            cardTitle={stateData.active}
            desc="Total No of Active Cases"
          />
        </div>
        <div className="col-3">
          <Card
            className="card text-center text-white bg-success mb-3"
            header="Recovered"
            cardTitle={stateData.recovered}
            desc="Total No of Recovered Cases"
          />
        </div>
        <div className="col-3">
          <Card
            className="card text-center text-white bg-secondary mb-3"
            header="Deceased"
            cardTitle={stateData.deceased}
            desc="Total No of Deceased"
          />
        </div>
      </div>
      <DistrictTable districts={stateData.districts}/>
    </Base>
  );
};

export default State;
