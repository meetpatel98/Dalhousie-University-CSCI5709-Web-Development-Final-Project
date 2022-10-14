/**
 *   @author : Vivekkumar Patel (B00874162)
 *   @description: Create a database connection to use in rest of the application modules.
 */



const mongoose = require("mongoose");


//This code has been refered from 
//https://www.section.io/engineering-education/nodejs-mongoosejs-mongodb/

const DB_URL =
"mongodb+srv://root:root@unitedrental.oqosi9p.mongodb.net/rental";

const warningParam={ useNewUrlParser: true };

const dbConnection = () => {
 mongoose
    .connect(DB_URL, warningParam)
    .then(() => {
      console.log("DB connection has been made");
    })
    .catch((error) => {
      console.log("Error while making db connection", error);
    });
};

module.exports = dbConnection;