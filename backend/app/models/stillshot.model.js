const sql = require("./db.js");

const StillShot = function(stillshot) {
    this.movie_no = stillshot.movie_no;
    this.movie_stillshot = stillshot.movie_stillshot;
};

StillShot.create = (stillShot, result) => {
    sql.query("INSERT INTO stillshot SET ?", stillShot, (err, res) => {
    if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
    }
    result(null, { id: res.insertId, ...stillShot });
    });
};

StillShot.findById = (movieId, result) => {
    sql.query(`SELECT movie_stillshot FROM stillshot WHERE movie_no = ${movieId}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (res.length) {
        console.log("found movie: ", res);
        result(null, res);
        console.log("DASDA", res.movie_stillshot)
        return;
      }
      
      result({ kind: "not_found" }, null);
    });
  };

  StillShot.findByIdUpdate = (movieId, result) => {
    sql.query(`SELECT movie_stillshot FROM stillshot WHERE movie_no = ${movieId}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (res.length) {
        console.log("found movie: ", res);
        result(null, res);
        console.log("DASDA", res.movie_stillshot)
        return;
      }
      
      result({ kind: "not_found" }, null);
    });
  };

module.exports = StillShot;
