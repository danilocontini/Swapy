'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Contacts Schema
 */
var Contacts = new Schema({
    contato: {
        type: Array,
        required: true,
        telefone: [Number],
        email: [String]
    }
});

/**
 * Owner Schema
 */
var OwnerSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    nome: {
        type: String,
        required: true,
        trim: true
    },
    cpf: {
        type: Number,
        required: true
    },
    contato: [Contacts]
});

/**
 * Statics
 */
OwnerSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  }).populate('user', 'name username').exec(cb);
};

mongoose.model('Owner', OwnerSchema);