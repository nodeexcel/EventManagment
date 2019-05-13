const express = require('express');
const router = express.Router();
const event = require('../models/events');

/* add event. */
router.post('/add', async (req, res, next) => {
    let eventInfo = await event.addEvent(req.body);
    res.send(eventInfo);
});

/** get all events with filter */
router.get('/get', async (req, res, next) => {
    let location = {}
    try {
        if (req.query.lat) {
            location['lat'] =  parseFloat(req.query.lat);
        }
        if (req.query.long) {
            location['long'] = parseFloat(req.query.long);
        }
        delete req.query.lat;
        delete req.query.long;
        req.query['location'] = location
        let eventInfo = await event.getAllEvents(req.query);
        res.send(eventInfo);
    } catch (e) {
        res.status(500).send(e)
    }
});
module.exports = router;
