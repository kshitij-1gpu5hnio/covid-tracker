const Country = require("../../models/countryDaily");
const {State, District} = require("../../models/statesDaily");

module.exports = app => {
  app.get("/api/country", (req, res, next) => {
    Country.find({ country: "India" })
      .exec()
      .then(country => res.json(country))
      .catch(err => next(err));
  });

  app.get("/api/states", (req, res, next) => {
    State.find().sort({ confirmed:"desc" })
      .exec()
      .then(states => res.json(states))
      .catch(err => next(err));
  });
};
