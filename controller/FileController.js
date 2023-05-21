const uploadFileMiddleware = require("../middleware/upload");
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
  try {
    await uploadFileMiddleware(req, res);
    if(req.file != undefined){
      let data = []; 
      fs.createReadStream(path.resolve(req.file.path))
        .pipe(csv.parse({headers: true}))
        .on('error', error => {
          console.error(error);
        })
        .on('data', row => {
          let respondent = {
            entry_date:row.entry_date,
            respondent_code:row.respondent_code,
            respondent_name:row.respondent_name,
            province: row.province,
            district: row.district,
            districts: row.districts,
            ward: row.ward,
            address: row.address,
            phone: row.phone,
            email: row.email,
            gender: row.gender,
            age: row.age,
            marital_status: row.marital_status,
            family_members: row.family_members,
            education: row.education,
            occupation: row.occupation,
            expense: row.expense,
            source_water: row.source_water,
            source_energy: row.source_energy,
            filename: row.filename,
            status: row.status,
          };
          data.push(respondent);
        })
        .on('end', () => {
          Respondents.bulkCreate(data)
          .then(() => {
            res.status(200).json(success("File has been uploaded!", res.statusCode));
          })
          .catch(err => {
            res.status(500).json(error("Error", res.statusCode, err.message));
        });
        });
    }else{
      res.status(500).json(error("no file found"));
    }
  } catch (err) {
    // if (err.code == "LIMIT_FILE_SIZE") {
    //   return res.status(500).send({
    //     message: "File size cannot be larger than 2MB!",
    //   });
    // }
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