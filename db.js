const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/EventManagement', { useNewUrlParser: true });

module.exports = mongoose;