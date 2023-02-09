const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();
const FileController = require("../controller/FileController");
const CampaignController = require("../controller/CampaignController");
const LoginController = require("../controller/LoginController");
// const WhatsAppController = require("../controller/WhatsAppController");

let routes = (app) => {
  // login
  router.post("/login", LoginController.login);

  // import-csv
  router.post("/upload", auth, FileController.upload);
  router.get("/respondents", auth, FileController.getRespondents);
  router.delete("/respondents/:id", auth, FileController.deleteRespondent);

  // crud campaigns
  router.get("/campaigns", auth, CampaignController.getCampaign);
  router.get("/campaigns/:id", auth, CampaignController.getCampaignById);
  router.post("/campaigns", auth, CampaignController.createCampaign);
  router.patch("/campaigns/:id", auth, CampaignController.updateCampaign);
  router.delete("/campaigns/:id", auth, CampaignController.deleteCampaign);

  // whatsapp
  // router.post("/send-message", WhatsAppController.options);

  app.use(router);
};

module.exports = routes;