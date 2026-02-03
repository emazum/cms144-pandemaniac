
/**
 * Module dependencies.
 */

var fs = require('fs')
  , path = require('path');

var helpers = require('./submit-helpers');

module.exports = exports = function (db, client) {
  helpers = helpers(db);

  return (
    {
      download: function (req, res, next) {
        var graph = req.params.id
          , filename = req.query.file || graph + '.json';

        // Check that the graph name is valid
        helpers.verifyName(graph, function (err, found) {
          if (err) {
            return next(err);
          }

          if (!found || !found.canDownload) {
            return res.status(400).render('400');
          }

          // Check that the graph file exists
          var pathname = path.join('private', 'graphs', found.graph.file);
          fs.exists(pathname, function (exists) {
            if (!exists) {
              return res.status(500).render('500');
            }
            // Send the file
            res.download(pathname, filename, function (err) {
              if (err) {
                return next(err);
              }
              // Start the clock, i.e. set the timer,
              // only necessary if can actually upload a submission
              if (found.canUpload) {
                var team = req.user
                  , expire = found.graph.timeout;
                recordDownload(db, client, graph, team, expire, next);
              }
            });
          });
        });
      }

    }
  );
};

/**
 * Sets the key to expire in the specified amount of time only if said
 * key does not already exist, i.e. only for the first download.
 *
 * db = database connection
 * graph = name of graph
 * team = name of team
 * expire = timeout in seconds
 * next = function(error, result)
 */
function recordDownload(db, client, graph, team, expire, next) {
  // Check whether has already submitted
  var query = { team: team, graph: graph }
    , update = { $setOnInsert: query }
    , options = { safe: true, upsert: true, new: false };

  var attempts = db.collection('attempts');
  attempts.findOneAndUpdate(query, update, options, function (err, doc) {
    if (err) {
      return next(err);
    }

    // If key not in attempts, create redis key with timer.
    if (doc.value == null) {
      // Set key to expire with timeout only if does not already exist
      var key = helpers.makeKey(graph, team);
      client.set(key, "true", function (err, reply) {
        if (err) {
          return next(err);
        }
        client.expire(key, expire);
      });
    }
  });
};
