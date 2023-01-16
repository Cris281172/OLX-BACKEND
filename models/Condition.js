const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const conditionSchema = Schema({
    name: {
        type: String,
        required: true
    }
})

module.exports = Condition = mongoose.model('Condition', conditionSchema);