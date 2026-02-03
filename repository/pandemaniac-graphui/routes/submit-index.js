
/**
 * Module dependencies.
 */

var helpers = require('./submit-helpers');

module.exports = exports = function (db, client) {
  helpers = helpers(db);

  return (
    {
      index: function (req, res, next) {
        var graph = req.params.id
          , team = req.user;

        // Check that the graph name is valid
        helpers.verifyName(graph, function (err, found) {
          if (err) {
            return next(err);
          }

          if (!found) {
            return res.status(404).render('404');
          }
          // Get the submission timeout for the graph
          var timeout = found.graph.timeout;

          var key = helpers.makeKey(graph, team);
          client.get(key, (err, reply) => {
            if (err) {
              return next(err)
            } if (reply) {
              client.ttl(key, (err, ttl) => checkTTL(err, ttl, res, team, graph, db, found, timeout));
            } else {
              checkTTL(null, -2, res, team, graph, db, found, timeout);
            }
          })
        });
      }

    }
  );
};


function checkTTL(err, ttl, res, team, graph, db, found, timeout) {
  if (err) {
    return next(err);
  }

  // Select upload tab when timer has yet to expire
  var selected = ttl >= 0 ? 'upload' : 'download'
    , error = res.locals.error
    , info = res.locals.info
    , log = res.locals.log
    , remain = Math.max(0, ttl);

  // Check whether has already uploaded
  var query = { team: team, graph: graph };

  var attempts = db.collection('attempts');
  attempts.findOne(query, function (err, attempt) {
    if (err) {
      return next(err);
    }

    // Check if has not downloaded yet
    if (!attempt) {
      if (found.canUpload) {
        info.push('Please refresh after download completes.');
      }
    }

    // ...or has already downloaded
    else if (!attempt.at) {
      // ...but failed to upload before timer expired
      if (ttl === -2) {
        error.push('Failed to upload a submission.');
      }
    }

    // Otherwise, has successfully uploaded
    // ...while timer has yet to expire
    else if (ttl >= 0) {
      info.push('Already have uploaded a submission.');
    }

    // ...and timer has expired
    else {
      log.push('Successfully attempted.');
    }

    res.render('submit/form', {
      graph: graph
      , description: found.graph.desc
      , numPlayers: found.numPlayers
      , numNodes: found.numNodes
      , numSeeds: found.numSeeds
      , canUpload: found.canUpload
      , selected: selected
      , timeout: timeout
      , remain: remain
    });
  });
}
