# Technical questions

## How long did you spend on the coding test?

Spent about 27hrs working on the assignment.

## What would you add to your solution if you had more time? If you didn't spend much time on the coding test then use this as an opportunity to explain what you would add.

First of all, I would have included unit tests, which this solution does not contain due to time constraints.
I would have added some charts for overall countries stats, and maybe some charts on the states page as well.

## What was the most useful feature that was added to the latest version of your chosen language/framework? Please include a snippet of code that shows how you've used it.

The for...in statement iterates over all enumerable properties of an object that are keyed by strings. It was added in ECMAScript (ECMA-262).


```
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

```
In the above given example i have used the for in statement to iterates over the keys of a district object of api response.
Alternative to this would be using Object.entries(), where you would get an array of key and values arrays. 

```
for (const [key, value] of Object.entries(object1)) {
  console.log(`${key}: ${value}`);
}

```

New feature of for...in statement makes the code more readable and understandable.

## How would you track down a performance issue in production? Have you ever had to do this?

To track down any performance issue, first we need answers for few questions, such as:
How much time does it take to serve a request?
How many requests can it serve in a given time period?
How many concurrent requests can it handle?

Through NodeJS testing tools, we can put the application under normal and extreme circumstances such as a few user requests in a given span of time Vs a huge number of concurrent requests in the same duration to see how the application performs in both the cases.
One of such tools is loadtest.

## List of all the libraries and packages used to complete the assignment

- babel
- express
- mongoose
- node-cron
- nodemon
- react
- react-dom
- react-router
- react-router-dom
- animated-number-react
- webpack
- webpack-cli
- webpack-dev-middleware
- webpack-hot-middleware
- webpack-merge
    
