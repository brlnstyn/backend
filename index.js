require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const db = require('./models');
const controller = require('./controller/CampaignController');

global.__basedir = __dirname;

var corsOptions = {
  origin: "http://localhost:8080"
};

// const run = async () => {

// };

// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
//   run();
// });

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization, x-access-token"
  );
  next();
});

app.use(cors(corsOptions));
app.use(express.json());

const initRoutes = require("./routes");

app.use(express.urlencoded({ extended: true }));
initRoutes(app);

let port = 8080;
app.listen(port, () => {
  console.log(`Running at localhost:${port}`);
});