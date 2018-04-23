var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var addressSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    address1: {
        type: String
    },
    address2: {
        type: String
    },
    zipcode: {
        type: String
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    country: {
        type: String
    },
    phone: {
        type: String
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

module.exports = mongoose.model('Address', addressSchema);
