const mongoose = require('mongoose');
const trackSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    trackList: {
        type: Array,
        required: false,
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('tracks', trackSchema);
