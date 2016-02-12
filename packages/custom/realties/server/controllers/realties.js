'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Realty = mongoose.model('Realty'),
    config = require('meanio').loadConfig(),
    _ = require('lodash');

module.exports = function(Realties) {

    return {
        /**
         * Find realty by id
         */
        realty: function(req, res, next, id) {
            Realty.load(id, function(err, realty) {
                if (err) return next(err);
                if (!realty) return next(new Error('Falha ao carregar o imóvel ' + id));
                req.realty = realty;
                next();
            });
        },
        /**
         * Create an realty
         */
        create: function(req, res) {
            var realty = new Realty(req.body);
            realty.user = req.user;

            realty.save(function(err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Não foi possível salvar o imóvel'
                    });
                }

                Realties.events.publish({
                    action: 'created',
                    user: {
                        name: req.user.name
                    },
                    url: config.hostname + '/realties/' + realty._id,
                    name: realty.title
                });

                res.json(realty);
            });
        },
        /**
         * Update an realty
         */
        update: function(req, res) {
            var realty = req.realty;

            realty = _.extend(realty, req.body);


            realty.save(function(err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot update the realty'
                    });
                }

                Realties.events.publish({
                    action: 'updated',
                    user: {
                        name: req.user.name
                    },
                    name: realty.title,
                    url: config.hostname + '/realties/' + realty._id
                });

                res.json(realty);
            });
        },
        /**
         * Delete an realty
         */
        destroy: function(req, res) {
            var realty = req.realty;


            realty.remove(function(err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot delete the realty'
                    });
                }

                Realties.events.publish({
                    action: 'deleted',
                    user: {
                        name: req.user.name
                    },
                    name: realty.title
                });

                res.json(realty);
            });
        },
        /**
         * Show an realty
         */
        show: function(req, res) {

            Realties.events.publish({
                action: 'viewed',
                user: {
                    name: req.user.name
                },
                name: req.realty.title,
                url: config.hostname + '/realties/' + req.realty._id
            });

            res.json(req.realty);
        },
        /**
         * List of Realties
         */
        all: function(req, res) {
            var query = req.acl.query('Realty');

            query.find({}).sort('-created').populate('user', 'name username').exec(function(err, realties) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot list the realties'
                    });
                }

                res.json(realties)
            });

        }
    };
}