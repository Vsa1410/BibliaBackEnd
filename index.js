const express = require("express");
const app = express();
const routes = require("./src/routes");
const functions = require("firebase-functions");


const cors = require("cors");

app.use(express.json());
app.use(cors({origin: true}));
app.use(routes);

const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`HelloNode app listening on port ${port}!`));

exports.app = functions.https.onRequest(app);
