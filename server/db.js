const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://atul:3vG8YOkIe9JrcrZK@cluster0-2zgda.mongodb.net/test?retryWrites=true', { useNewUrlParser: true });

module.exports = mongoose;