exports.handleEmpty = function(value) {
  return typeof value != 'undefined' ? value : '';
}

exports.b64Response = function(response){
  return new Buffer(response).toString('base64')
}
