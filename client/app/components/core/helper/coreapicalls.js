const fetch = require("node-fetch");

//Get country data
export const getCountryData = () => {
  return fetch("/api/country", { method: "GET" })
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .catch((err) => {
      return { error: err.message };
    });
};

//Get states data
export const getStatesData = () => {
  return fetch("/api/states", { method: "GET" })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      return { error: err.message };
    });
};
