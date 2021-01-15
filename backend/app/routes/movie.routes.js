module.exports = app => {
  const movie = require("../controllers/movie.controller.js");

  // Create a new Customer
  app.post("/movies", movie.create);

  // Retrieve all Customers
  app.get("/movies", movie.findAll);

  // Retrieve a single Customer with customerId
  app.get("/movies/:movieKeyword", movie.findOne);

  // Update a Customer with customerId
  app.put("/movies/:movieId", movie.update);

  // Delete a Customer with customerId
  app.delete("/movies/:movieId", movie.delete);

};