var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var reservationSchema = new Schema({
    user_id: {
      // get from user session
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    package_id: {
      // get from url(need route modification) or parse from front end
        type: Schema.Types.ObjectId,
        ref: 'Package'
    },
    from: {
      // reservation start date
        type: Date
    },
    until: {
      // reservation end date
        type: Date
    },
    pax: {
      // number of person
        type: Number
    },
    status: {
      // pending or approved
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
