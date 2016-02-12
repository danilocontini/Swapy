'use strict';

// Article authorization helpers
var hasAuthorization = function(req, res, next) {
  if (!req.user.isAdmin && !req.realty.user._id.equals(req.user._id)) {
    return res.status(401).send('User is not authorized');
  }
  next();
};

var hasPermissions = function(req, res, next) {

    req.body.permissions = req.body.permissions || ['authenticated'];

    for (var i = 0; i < req.body.permissions.length; i++) {
      var permission = req.body.permissions[i];
      if (req.acl.user.allowed.indexOf(permission) === -1) {
            return res.status(401).send('User not allowed to assign ' + permission + ' permission.');
        }
    }

    next();
};

module.exports = function(Realties, app, auth) {
  
  var realties = require('../controllers/realties')(Realties);

  app.route('/api/realties')
    .get(realties.all)
    .post(auth.requiresLogin, hasPermissions, realties.create);
  app.route('/api/realties/:realtyId')
    .get(auth.isMongoId, realties.show)
    .put(auth.isMongoId, auth.requiresLogin, hasAuthorization, hasPermissions, realties.update)
    .delete(auth.isMongoId, auth.requiresLogin, hasAuthorization, realties.destroy);

  // Finish with setting up the realtyId param
  app.param('realtyId', realties.realty);
};
