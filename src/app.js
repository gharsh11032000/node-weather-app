const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geocode = require("./utlis/geocode");
const forecast = require("./utlis/forecast");

const app = express();
const port = process.env.PORT || 3000;

const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
const publicDirectory = path.join(__dirname, "../public");

app.set("views", viewsPath);
app.set("view engine", "hbs");

hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectory));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "hrsh gupta",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Address must be provided!",
    });
  }

  const address = req.query.address;

  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({
        error: error,
      });
    }

    forecast(
      latitude,
      longitude,
      (error, { weather, temperature, feelslike }) => {
        if (error) {
          return res.send({
            error: error,
          });
        }
        res.send({
          forecast: `${weather}, It's ${temperature} F outside and it's feel's like ${feelslike} F`,
          location: location,
        });
      }
    );
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "hrsh gupta",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    helpText: " For any help leave us a message to gharsh11032000@gmail.com.",
    name: "hrsh gupta",
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMsg: "Help article page not found!",
    name: "hrsh gupta",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMsg: "Page not found!",
    name: "hrsh gupta",
  });
});

app.listen(port, () => {
  console.log(`Server runs on port ${port}`);
});
