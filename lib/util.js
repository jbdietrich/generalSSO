exports.handleEmpty = function(value) {
  return typeof value != 'undefined' ? value : '';
}

exports.urlSafeResponse = function(response){
  return new Buffer(response).toString('base64')
}
