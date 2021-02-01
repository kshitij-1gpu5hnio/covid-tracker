import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Link, withRouter } from "react-router-dom";
import { addStatetoLocalStorage } from "./helper/storagehelper";

const Table = ({ states }) => {
  const [redirect, setRedirect] = useState(false);

  const handleRowClick = (state) => {
    addStatetoLocalStorage(state, () => setRedirect(true));
  };

  const getARedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/state" />;
    }
  };

  const renderTableData = (states) => {
    return states.map((item, index) => {
      const { state, confirmed, recovered, tested, deceased } = item; //destructuring
      return (
        <tr className="clickable" key={index} onClick={() => handleRowClick(item)}>
          <td>{state}</td>
          <td>{confirmed}</td>
          <td>{confirmed - (recovered + deceased)}</td>
          <td>{recovered}</td>
          <td>{tested}</td>
          <td>{deceased}</td>
        </tr>
      );
    });
  };
  return (
    <div>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">States</th>
            <th scope="col">Confirmed</th>
            <th scope="col">Active</th>
            <th scope="col">Recovered</th>
            <th scope="col">Tested</th>
            <th scope="col">Deceased</th>
          </tr>
        </thead>
        <tbody>
          {getARedirect(redirect)}
          {renderTableData(states)}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
