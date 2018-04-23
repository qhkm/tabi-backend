var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var reservationSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    package_id: {
        type: Schema.Types.ObjectId,
        ref: 'Package'
    },
    status: {
        type: String,
        default: 'Pending'
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Reservation', reservationSchema);
