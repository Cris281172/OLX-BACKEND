const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    token: {
        type: String
    },
    changePasswordToken: {
        type: String,
    },
    favoriteAdvertisements: {
        type: Array,
    }

})

module.exports = User = mongoose.model('User', userSchema);