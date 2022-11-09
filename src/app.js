const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geocode = require("./utlis/geocode");
const forecast = require("./utlis/forecast");

const app = express();

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
    name: "Harsh Gupta",
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
    name: "Harsh Gupta",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    helpText: "This is some helpful text",
    name: "Harsh Gupta",
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMsg: "Help article page not found!",
    name: "Harsh Gupta",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMsg: "Page not found!",
    name: "Harsh Gupta",
  });
});

app.listen("3000", () => {
  console.log("Server runs on port 3000");
});
