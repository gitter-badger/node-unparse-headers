/*!
 * unparse-headers
 * Copyright(c) 2016 Steven Eksteen
 * MIT Licensed
 */

'use strict'

/**
 * Module dependencies
 * @api private
 */

/**
 * Module exports
 */
module.exports = unparseHeaders

/**
 * Create a middleware to unparse headers.
 *
 * @param {object} [options]
 * @return {function}
 * @api public
 */

function unparseHeaders(options) {
  return function unparseHeaders(req, res, next) {
    for (var oldkey in req.headers) {
      var newkey = oldkey.replace(/((?:^|-)[a-z])/g, function(val) { return val.toUpperCase(); });
      // custom hack for X-Parse-Os-Version ==> X-Parse-OS-Version
      newkey = newkey.replace(/(-Os-)/g, function(val) { return val.toUpperCase(); });
      req.headers[newkey] = req.headers[oldkey];
      delete req.headers[oldkey];
    }
    next()
  }
}
