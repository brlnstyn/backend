const uploadFileMiddleware = require("../middleware/upload");
// const db = require('../../config/database');
const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const fs = require('fs');
const csv = require('fast-csv');
const mysql = require('mysql')
const multer = require('multer')
const path = require('path')
const { success, error, validation } = require('../../config/responseApi')
const { body, validationResult,check } = require('express-validator');

const upload = async (req, res) => {
  const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "campaigns"
})
  // console.log(req);
  //   return;
  try {
    await uploadFileMiddleware(req, res);
    // console.log(req.file);
    // return;
    if(req.file != undefined){
      // console.log(req.file);
      // return;
      let stream = fs.createReadStream(req.file.path);
      let csvData = [];
      let csvStream = csv
        .parse()
        .on("data", function (data) {
            csvData.push(data);
        })
        .on("end", function () {
            // Remove Header ROW
            csvData.shift();
    
            // Open the MySQL connection
            let query = 'INSERT INTO database_users (entry_date, respondent_code, respondent_name, province, district, districts, ward, address, phone, email, gender, age, marital_status, family_members, education, occupation, expense, source_water, source_energy, filename, status) VALUES ?';
            db.query(query, [csvData], (error, response) => {
                console.log(error || response);
            });
        });

    stream.pipe(csvStream);
      // console.log(csvStream);
      // return;
      res.status(200).send({
        message: "File has been successfully uploaded!"
      });
    }else{
      res.status(400).send({
        message: "No file has been uploaded!"
      });
    }
  } catch (err) {
    res.status(500).json(error("Error", res.statusCode, err.message));
  }
};

const getListFiles = (req, res) => {
  const directoryPath = __basedir + "/resources/uploads/";

  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      res.status(500).send({
        message: "Unable to scan files!",
      });
    }

    let fileInfos = [];

    files.forEach((file) => {
      fileInfos.push({
        name: file,
        url: baseUrl + file,
      });
    });

    res.status(200).send(fileInfos);
  });
};

const download = (req, res) => {
  const fileName = req.params.name;
  const directoryPath = __basedir + "/resources/uploads/";

  res.download(directoryPath + fileName, fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: "Could not download the file. " + err,
      });
    }
  });
};

module.exports = {
  upload,
  getListFiles,
  download,
};