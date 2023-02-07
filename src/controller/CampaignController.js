const Campaigns = require('../../models/campaigns');
const express = require('express')

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

const createCampaign = async(req, res) => {
    // console.log(req.body);
    // return;
    try{
        await Campaigns.create(req.body);
        res.status(201).json({msg: "campaigns created successfully"});
    }catch(error){
        console.log(error.message);
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