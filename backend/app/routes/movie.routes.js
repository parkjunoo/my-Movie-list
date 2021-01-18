
module.exports = app => {
  const movie = require("../controllers/movie.controller.js");
  
  // Movie Create
  app.post("/movies", movie.create);
  // Movie findAll
  app.get("/movies/", movie.findAll);
  // Movie findAllByName
  app.get("/movies/:movieKeyword", movie.findKeywordAll);
  // Movie Update
  app.put("/movies/:movieId", movie.update);
  // Movie Delete
  app.delete("/movies/:movieId", movie.delete);

  // StillShot Create
  app.post("/stillshot",movie.createStillShot);
  // StillShot FindByMoiveId
  app.get("/stillshot/:movieId", movie.findIdStillshot);

  app.get("/stillshot/update/:movieId", movie.findIdStillshotUpdate);

};