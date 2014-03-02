exports.display = function(req, res){

  var request = { params: req.query,
                  path:   req.path,
                  method: req.method,
                  origin: (req.headers['x-forwarded-for'] || '').split(',')[0] || req.connection.remoteAddress };

  res.render('logout', { request: JSON.stringify(request, undefined, 2) });
}
