
module.exports = app => {
  const movie = require("../controllers/movie.controller.js");
  
  app.post("/movies", movie.create);

  app.get("/movies/", movie.findAll);

  app.get("/movies/:movieKeyword", movie.findKeywordAll);

  app.put("/movies/:movieId", movie.update);

  app.delete("/movies/:movieId", movie.delete);

  //StillShot
  //stillshot 등록
  app.post("/stillshot",movie.createStillShot);
  //stillshot 영화 아이디로 찾기
  app.get("/stillshot/:movieId", movie.findIdStillshot);
};