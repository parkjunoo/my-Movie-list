const Movie = require("../models/movie.model.js");

// movie 객체 생성
exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const movie = new Movie({
    movie_title: req.body.movie_title,
    movie_published: req.body.movie_published,
    movie_score: req.body.movie_score,
    movie_stillshot: req.body.movie_stillshot,
    movie_description: req.body.movie_description,
    movie_age: req.body.movie_age
  });

  Movie.create(movie, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "controller : create 생성되지 못했습니다."
      });
    else res.send(data);
  });
};

// 영화 전체 찾기 
exports.findAll = (req, res) => {
  Movie.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "controller: findall : error"
      });
    else res.send(data);
  });
};

// 내용이 포함된 모든 영화 검색
exports.findOne = (req, res) => {
  Movie.findById(req.params.movieKeyword, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `controller: findOne: id없음 ${req.params.movieId}.`
        });
      } else {
        res.status(500).send({
          message: "controller: findOne: server " + req.params.movieId
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
      message: "controller: update : 다채워야한다."
    });
  }

  Movie.updateById(
    req.params.movieId,
    new Movie(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `controller: updateByid Not found movie with id ${req.params.movieId}.`
          });
        } else {
          res.status(500).send({
            message: "controller: updateByid Error updating mvoie with id " + req.params.movieId
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
  Movie.remove(req.params.movieId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `controller : delete : Not found movie with id ${req.params.movieId}.`
        });
      } else {
        res.status(500).send({
          message: "controller : delete : Could not delete movie with id " + req.params.movieId
        });
      }
    } else res.send({ message: `${req.params.movieId} deleted successfully!` });
  });
};