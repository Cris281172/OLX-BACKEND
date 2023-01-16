const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const advertisementSchema = Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    createdTime: {
        type: Number,
        required: true,
    },
    categoryID: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    userID: {
        type: String,
        required: true,
    },
    promoted: {
        type: Boolean
    },
    views: {
        type: Number,
    },
    status: {
        type: String,
        required: true
    }
})

module.exports = advertisement = mongoose.model('advertisement', advertisementSchema);