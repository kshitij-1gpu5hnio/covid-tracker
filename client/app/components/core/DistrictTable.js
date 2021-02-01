import React from "react";

const DistrictTable = ({ districts = [] }) => {

  const renderTableData = (districts) => {
    console.log(districts);
    return districts.map((item, index) => {
      const { district, confirmed, recovered, tested, deceased } = item; //destructuring
      return (
        <tr key={index}>
          <td>{district}</td>
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
      <table class="table">
        <thead class="thead-dark">
          <tr>
            <th scope="col">Districts</th>
            <th scope="col">Confirmed</th>
            <th scope="col">Active</th>
            <th scope="col">Recovered</th>
            <th scope="col">Tested</th>
            <th scope="col">Deaths</th>
          </tr>
        </thead>
        <tbody>
          {renderTableData(districts)}
        </tbody>
      </table>
    </div>
  );
};

export default DistrictTable;
