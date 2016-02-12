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
    tipo: {
        type: Array
    },
    localizacao: {
        type: Array
    },
    valor: {
        type: Number
    },
    criado: {
        type: Date,
        default: Date.now
    }
});

/**
 * Validations
 */
RealtySchema.path('title').validate(function(title) {
  return !!title;
}, 'Title cannot be blank');

RealtySchema.path('content').validate(function(content) {
  return !!content;
}, 'Content cannot be blank');

/**
 * Statics
 */
RealtySchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  }).populate('user', 'name username').exec(cb);
};

mongoose.model('Realty', RealtySchema);
