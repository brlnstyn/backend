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
const Respondents = require('../models/respondents');
const { success, error, validation } = require('../config/responseApi')
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
      res.status(200).json(success("File has been successfully uploaded!", res.statusCode));
    }else{
      res.status(500).json(error("Error", res.statusCode, err.message));
    }
  } catch (err) {
    if (err.code == "LIMIT_FILE_SIZE") {
      return res.status(500).send({
        message: "File size cannot be larger than 2MB!",
      });
    }
    res.status(500).json(error("Error", res.statusCode, err.message));
  }
};

const getRespondents = async(req, res) => {
  try{
      const response = await Respondents.findAll();
      res.status(200).json(response);
  }catch(error){
      console.log(error.message);
  }
}

const deleteRespondent = async(req, res) => {
  try{
      await Respondents.destroy({
          where: {
              id: req.params.id
          }
      });
      res.status(200).json({msg: "Respondents deleted successfully"});
  }catch(error){
      console.log(error.message);
  }
}



module.exports = {
  upload,
  getRespondents,
  deleteRespondent
};