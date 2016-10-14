var http = require('http'),
    request = require('supertest'),
    unparseHeaders = require('../index');

describe('unparseHeaders()', function () {
  it('should unparse the request headers', function (done) {
    var server = createServer(undefined, function(req, res) {
      res.setHeader('Content-Type', 'text/plain')
    })

    request(server)
    .get('/')
    .expect('Content-Type', 'text/plain', done)
  })
})

function createServer(opts, fn) {
  var _unparseHeaders = unparseHeaders(opts)
  return http.createServer(function (req, res) {
    _unparseHeaders(req, res, function (err) {
      setTimeout(function () {
        fn && fn(req, res)
        res.statusCode = err ? (err.status || 500) : 200
        res.end(err ? err.message : 'OK')
      }, 10)
    })
  })
}
