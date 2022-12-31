const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const resetToken = Schema({
    token: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    }
})

module.exports = ResetToken = mongoose.model('ResetToken', resetToken);