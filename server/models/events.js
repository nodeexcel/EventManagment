const mongoose = require('../db');

const Event = mongoose.model('Event', {
    title: { type: String },
    detail: { type: String },
    location: {
        lat: {
            type: Number,
            required: true
        },
        long: {
            type: Number,
            required: true
        }
    },
    locationName: {
        type: String,
        required: true
    },
    EventStartDate: {
        type: Date
    },
    EventEndDate: {
        type: Date
    }
})

Event.addEvent = async (EventInfo) => {
    let events = await Event.find({ location: EventInfo.location, EventStartDate: { $gte: EventInfo.EventStartDate, $lte: EventInfo.EventStartDate } })
    if (events.length) {
        return { status: 0, message: "Event Already Exists", data: [] }
    } else {
        let event = new Event(EventInfo);
        let eventSavedResponse = await event.save();
        return eventSavedResponse;
    }
}

Event.getAllEvents = async (queryParameter) => {
    let parameters = Object.keys(queryParameter);
    let query = {}
    if (parameters.length) {
        parameters.forEach(value => {
            query[value] = queryParameter[value]
        })
    }
    let events = await Event.find(query)
    return { status: 1, data: events }
}

module.exports = Event;