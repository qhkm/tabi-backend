var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var packageSchema = new Schema({
    company_id: {
        type: Schema.Types.ObjectId,
        ref: 'Company'
    },
    name: {
        type: String
    },
    description: {
        type: String
    },
    price: {
        type: Number
    },
    category: {
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

module.exports = mongoose.model('Package', packageSchema);
