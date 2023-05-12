const mongoose = require("mongoose");
require("dotenv").config();

// connect to db
const db_url = process.env.DB_URL;

// mongoose
//     .connect(db_url)
//     .then(() => {
//         console.log("connected to db");
//     })
//     .catch((err) => {
//         console.log("error connecting to db", err);
//     });

try {
    mongoose.connect(db_url);
    console.log(`connected to database. Port ${db_url}`);
} catch (error) {
    console.log(error);
}
