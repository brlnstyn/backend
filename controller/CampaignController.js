const db = require('../models');
const campaigns = db.campaigns;
const respondents = db.respondents;
const Campaigns = require('../models/campaigns');
const { success, error, validation } = require("../config/responseApi");
const express = require('express')


exports.validate = (method) => {
    switch (method) {
        case 'create': {
            return [                
                check('id').exists().notEmpty(),
            ]
        }
    }
}
const getCampaign = async(req, res) => {
    try{
        const response = await Campaigns.findAll();
        res.status(200).json(response);
    }catch(error){
        console.log(error.message);
    }
}

const getCampaignById = async(req, res) => {
    try{
        const response = await Campaigns.findOne({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(response);
    }catch(error){
        console.log(error.message);
    }
}
exports.create = (province, campaigns) => {
    return campaigns.create({
        campaign_name: campaigns.campaign_name,
        client_name: campaigns.client_name,
        setup_domicile: province,
        setup_age_start: campaigns.setup_age_start,
        setup_age_end: campaigns.setup_age_end,
        setup_gender: campaigns.setup_gender,      
        setup_profession: campaigns.setup_profession,
        setup_martial_status: campaigns.setup_martial_status,
        setup_age_married: campaigns.setup_age_married,
        setup_total_respondent: campaigns.setup_total_respondent,
        message: campaigns.message,
        status: campaigns.status,
        total_blasting: campaigns.total_blasting,
        blasting_endtime: campaigns.blasting_endtime 
    })
}
const createCampaign = async(req, res) => {
    // console.log(req.body);
    // return;
    const request_data = {
        campaign_name: req.body.campaign_name,
        client_name: req.body.client_name,
        setup_domicile: req.body.setup_domicile,
        setup_age_start: req.body.setup_age_start,
        setup_age_end: req.body.setup_age_end,
        setup_gender: req.body.setup_gender,      
        setup_profession: req.body.setup_profession,
        setup_martial_status: req.body.setup_martial_status,
        setup_age_married: req.body.setup_age_married,
        setup_total_respondent: req.body.setup_total_respondent,
        message: req.body.message,
        status: req.body.status,
        total_blasting: req.body.total_blasting,
        blasting_endtime: req.body.blasting_endtime  
    };
    try{
        await Campaigns.create(request_data);
        res.status(200).json(success("Create campaign successfully", res.statusCode));
    }catch(err){
        res.status(500).json(error("Error", res.statusCode, err.message));
    }
}

const updateCampaign = async(req, res) => {
    try{
        await Campaigns.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({msg: "campaigns updated successfully"});
    }catch(error){
        console.log(error.message);
    }
}

const deleteCampaign = async(req, res) => {
    try{
        await Campaigns.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({msg: "campaigns deleted successfully"});
    }catch(error){
        console.log(error.message);
    }
}

module.exports = {
    getCampaign,
    getCampaignById,
    createCampaign,
    updateCampaign,
    deleteCampaign}