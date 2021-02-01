const fetch = require("node-fetch");
const Country = require("../models/countryDaily");
const { State, District } = require("../models/statesDaily");
const statesAbb = require("./statesAbbreviation.json");

exports.getStateName = (abb) => {
  for (const item of statesAbb) {
    if (item.abbreviation === abb) {
      return item.state;
    }
  }
};

const url = "https://api.covid19india.org/v4/data.json";

const statesData = [];
const countryData = {
  country: "India",
  confirmed: 0,
  recovered: 0,
  deceased: 0,
  tested: 0,
  source: url,
  isStale: false,
};

const getData = async () => {
  return await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        Country.findOneAndUpdate(
          { country: "India" },
          { isStale: true },
          (err, data) => {
            if (err) {
              console.log(
                "Unable to update isStale property in country document."
              );
            }
            console.log(
              "Unable to fetch data from the public API, marking data as stale."
            );
          }
        );
        return null;
      }
      return response.json();
    })
    .catch((err) => console.log(err));
};

const getDistricts = (data, state) => {
  let districts = [];
  for (const dist in data[state].districts) {
    let temp = data[state].districts;
    let distTemp = {
      district: dist,
      confirmed: temp[dist].total.confirmed,
      recovered: temp[dist].total.recovered,
      deceased: temp[dist].total.deceased,
      tested: temp[dist].total.tested,
    };
    districts.push(distTemp);
  }
  return districts;
};

const populateCountryStateData = async (liveData) => {
  for (const item in liveData) {
    if (item === "TT") {
      countryData.confirmed = liveData[item].total.confirmed;
      countryData.recovered = liveData[item].total.recovered;
      countryData.deceased = liveData[item].total.deceased;
      countryData.tested = liveData[item].total.tested;
      countryData.source_updated_at = new Date();
      continue;
    }
    let districts = getDistricts(liveData, item);
    let temp = {
      state: this.getStateName(item),
      confirmed: liveData[item].total.confirmed,
      recovered: liveData[item].total.recovered,
      deceased: liveData[item].total.deceased,
      tested: liveData[item].total.tested,
      districts: districts,
      population: liveData[item].meta.population,
      source_updated_at: liveData[item].meta.last_updated,
      source: liveData[item].meta.tested.source,
    };
    statesData.push(temp);
  }
};

const updateCountryData = async () => {
  console.log("Updating country data...");
  await Country.findOneAndUpdate(
    { country: "India" },
    countryData,
    { upsert: true },
    (err, data) => {
      if (err) {
        console.log("Unable to update the data in country document.");
      }
      console.log(
        `Updated the country data at ${new Date().toLocaleString()}.`
      );
    }
  );
};

const updateStatesData = async () => {
  console.log("Updating states data...");
  for (const item of statesData) {
    await State.findOneAndUpdate(
      { state: item.state },
      item,
      { upsert: true },
      (err, doc) => {
        if (err) {
          console.log(`Encountered error while updating ${item.state} in db.`);
        }
      }
    );
  }
  console.log(`Updated the states data at ${new Date().toLocaleString()}.`);
};

exports.updateDb = async () => {
  let liveData;
  await getData().then((data) => {
    if (data) {
      liveData = data;
      console.log(
        `Retrieved data from API successfully at ${new Date().toLocaleString()}`
      );
    }
  });

  if (liveData != null) {
    await populateCountryStateData(liveData);
    await updateCountryData();
    await updateStatesData();
  }
};
