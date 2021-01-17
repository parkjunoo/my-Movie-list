const sql = require("./db.js");

const Admin = function(admin) {
    this.password = admin.password;
};

Admin.findById = (password, result) => {
 };

  
module.exports = Admin;
