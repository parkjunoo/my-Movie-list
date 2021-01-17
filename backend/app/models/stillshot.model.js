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


// StillShot.updateById = (id, movie, result) => {
//     sql.query(
//       "UPDATE movie SET movie_title = ?, movie_published = ?, movie_score = ?, movie_stillshot = ?, movie_description =? WHERE id = ?",
//       [movie.movie_title, movie.movie_published, movie.movie_score, movie.movie_stillshot, movie.movie_description, movie_age],
//       (err, res) => {
//         if (err) {
//           console.log("error: ", err);
//           result(null, err);
//           return;
//         }
  
//         if (res.affectedRows == 0) {
//           // not found Customer with the id
//           result({ kind: "not_found" }, null);
//           return;
//         }
  
//         console.log("updated movier: ", { id: id, ...movie });
//         result(null, { id: id, ...movie });
//       }
//     );
// };

module.exports = StillShot;
