const express = require("express");
const cors = require("cors");
const app = express();

require("dotenv").config();

require("./db/connection.js");

const route = require("./router/route.js");

// -> Connection
const port = process.env.PORT;
app.use(cors());
app.use(express.json());
app.use(route);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
