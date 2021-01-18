const sql = require("./db.js");

const Admin = function(admin) {
    this.password = admin.password;
};
module.exports = Admin;
