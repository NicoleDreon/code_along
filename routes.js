"use strict";
const { response } = require("express");
//pull express library into this file
const express = require("express");
//routes and endpoints are the same
const routes = express.Router();

const movies = [
  {
    id: 1,
    title: "Furngully: The Last Rainforest",
    year: 1992,
    animated: true,
  },
  {
    id: 2,
    title: "Bohemian Rhapsody",
    year: 2018,
    animated: false,
  },
  {
    id: 3,
    title: "The Holiday",
    year: 2006,
    animated: false,
  },
];
let nextId = 5;

//GET /movies - respond with JSON array of movies
routes.get("/movies", (req, res) => {
  res.json(movies);
});

routes.get("/movies/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const movie = movies.find((movie) => movie.id === id);
  if (movie) {
    res.json(movie);
  } else {
    res.status(404);
    res.send("No movie with id ${id} exists.");
  }
});

routes.post("/movies", (req, res) => {
  const movie = req.body;
  movie.id = nextId++;
  movies.push(movie);

  res.status(201);
  res.json(movie);
});

routes.delete("/movies/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = movies.findIndex((movie) => movie.id === id);
  if (index !== -1) {
    movies.splice(index, 1);
  }
  res.status(204);
  res.send();
});
//
//
//export routes for use in server.js
module.exports = routes;
