const Movie = require("../models/movie.model.js");

// Create and Save a new Customer
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Customer
  const movie = new Movie({
    movie_title: req.body.movie_title,
    movie_published: req.body.movie_published,
    movie_score: req.body.movie_score,
    movie_stillshot: req.body.movie_stillshot,
    movie_description: req.body.movie_description,
  });

  // Save Customer in the database
  Movie.create(movie, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Customer."
      });
    else res.send(data);
  });
};

// Retrieve all Customers from the database.
exports.findAll = (req, res) => {
  Movie.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers."
      });
    else res.send(data);
  });
};

// Find a single Customer with a customerId
exports.findOne = (req, res) => {
  Movie.findById(req.params.movieId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Customer with id ${req.params.movieId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Customer with id " + req.params.movieId
        });
      }
    } else res.send(data);
  });
  
};

// Update a Customer identified by the customerId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Movie.updateById(
    req.params.movieId,
    new Movie(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found movie with id ${req.params.movieId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating mvoie with id " + req.params.movieId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Customer with the specified customerId in the request
exports.delete = (req, res) => {
  Movie.remove(req.params.movieId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found movie with id ${req.params.movieId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete movie with id " + req.params.movieId
        });
      }
    } else res.send({ message: `movie was deleted successfully!` });
  });
};