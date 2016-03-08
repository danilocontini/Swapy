'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Owner = mongoose.model('Owner'),
    config = require('meanio').loadConfig(),
    _ = require('lodash');

module.exports = function(Owner) {

    return {
        /**
         * Find Owner by id
         */
        owner: function(req, res, next, id) {
            Owner.load(id, function(err, owner) {
                if (err) return next(err);
                if (!owner) return next(new Error('Failed to load owner ' + id));
                req.owner = owner;
                next();
            });
        },
        /**
         * Create an owner
         */
        create: function(req, res) {
            var owner = new Owner(req.body);
            owner.owner = req.owner;

            owner.save(function(err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot save the owner'
                    });
                }

                Owner.events.publish({
                    action: 'created',
                    owner: {
                        nome: req.owner.nome
                    },
                    url: config.hostname + '/owner/' + owner._id,
                    name: article.title
                });

                res.json(article);
            });
        },
        /**
         * Show an article
         */
        show: function(req, res) {

            Articles.events.publish({
                action: 'viewed',
                user: {
                    name: req.user.name
                },
                name: req.article.title,
                url: config.hostname + '/articles/' + req.article._id
            });

            res.json(req.article);
        },
        /**
         * List of Articles
         */
        all: function(req, res) {
            var query = req.acl.query('Article');

            query.find({}).sort('-created').populate('user', 'name username').exec(function(err, articles) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot list the articles'
                    });
                }

                res.json(articles)
            });

        }
    };
}