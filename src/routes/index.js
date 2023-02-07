const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();
const FileController = require("../controller/FileController");
const CampaignController = require("../controller/CampaignController");
const LoginController = require("../controller/LoginController");

let routes = (app) => {
  // login
  router.post("/login", LoginController.login);

  // import-csv
  router.post("/upload", FileController.upload);
  router.get("/files", auth, FileController.getListFiles);
  router.get("/files/:name", auth, FileController.download);

  // crud campaigns
  router.get("/campaigns", auth, CampaignController.getCampaign);
  router.get("/campaigns/:id", auth, CampaignController.getCampaignById);
  router.post("/campaigns", CampaignController.createCampaign);
  router.patch("/campaigns/:id", auth, CampaignController.updateCampaign);
  router.delete("/campaigns/:id", auth, CampaignController.deleteCampaign);

  app.use(router);
};

module.exports = routes;