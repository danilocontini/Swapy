'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Realty Schema
 */
var RealtySchema = new Schema({

    created: {
        type: Date,
        default: Date.now
    },
    proprietario: {
        type: Schema.ObjectId,
        ref: 'Owner',
        required: true
    },
    tipo: {
        type: Array,
        required: true,
    },
    content: {
        type: String,
        required: true,
        trim: true
    },
    permissions: {
        type: Array
    },
    updated: {
        type: Array
    }
});

mongoose.model('Realty', RealtySchema);