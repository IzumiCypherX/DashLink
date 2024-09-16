const express = require('express');
const path = require('path');
const { createUniqueLink } = require('../controllers/createUniqueLink');

const db = require('../models');
const generateQRCode = require('../controllers/createQR');

const linkRouter = express.Router();

linkRouter.post('/api/generateLink', (req, res, next) => {
    const { link } = req.body;

    if(!req.session.userId) {
        return res.status(401).json({
            status: 401,
            message: 'Unauthorized'
        })
    }
    
    if (!link) {
        return res.status(400).json({
            status: 400,
            message: 'Link cannot be empty'
        })
    }  

    if (!link.startsWith('https://') && !link.startsWith('http://')) {
        return res.status(400).json({
            status: 400,
            message: 'Link must start with http:// or https://'
        })
    }

    const uniqueLink = createUniqueLink();

    db.links.create({
        creator_id: req.session.userId, 
        url: link, 
        shortUrl: uniqueLink
    })

    generateQRCode(uniqueLink);
    res.status(200).json({
        status: 200,
        message: 'endpoints created successfully',
        origin: link,
        link: process.env.ROOT_NAME+ "/" + uniqueLink,
        qrCode: process.env.ROOT_NAME+ "/media/qr/" + uniqueLink + ".png"
    })
})

linkRouter.delete('/api/deleteLink', (req, res, next) => {
    if(!req.session.userId) {
        return res.status(401).json({
            status: 401,
            message: 'Unauthorized'
        })
    }
    const { shortUrl } = req.body;
    try {
        db.links.destroy({
            where: {
                shortUrl: shortUrl
            }
        })

        // Remove the file named shortUrl.png from ../controllers/public folder

        require('fs').unlinkSync(path.dirname(__dirname) +'/controllers/public/' + shortUrl + '.png');

        res.status(200).json({
            status: 200,
            message: 'endpoint deleted successfully'
        })
    } catch (err) {
        console.log(err);
        res.status(404).json({
            status: 404,
            message: 'Not found'
        })
    }
    
})

linkRouter.get('/:shortUrl', async (req, res) => {
    try {
        const result = await db.links.findOne({
            where: {
                shortUrl: req.params.shortUrl
            }
        })
        link = result.url;

        result.views += 1;
        result.save();

        res.redirect(link);
    } catch (err) {
        res.status(404).json({
            status: 404,
            message: 'Not found'
        })
    }
})

module.exports = linkRouter