var saml20      = require('saml').Saml20,
    pd          = require('pretty-data').pd,
    fs          = require('fs'),
    path        = require('path'),
    templates   = require('../lib/templates'),
    util        = require('../lib/util');

exports.display = function(req, res){
   res.render('saml', { SAMLRequest: req.query.SAMLRequest || '',
                        RelayState:  req.query.RelayState  || ''});
}

exports.generate = function(req, res){

  var options = {
    cert:              util.handleEmpty(req.body.cert.cert), // todo: fix default/error handling for certs, see also L25
    key:               util.handleEmpty(req.body.cert.key),
    issuer:            'generalSSO',
    lifetimeInSeconds: 600,
    audiences:         util.handleEmpty(req.body.meta.destination),
    attributes:        req.body.attrs,
    nameIdentifier:    util.handleEmpty(req.body.nameid) || ' ' // permit empty string to simulate badly formatted NameID
  };

  try {
    var assertion = saml20.create(options);
  }
  catch(e) {
    var assertion = null;
  }

  var destination = 'https://' + util.handleEmpty(req.body.meta.destination) + '/access/saml';
  var RelayState = util.handleEmpty(req.body.meta.relay_state) || ' ';

  var response = templates.response({
    id:             util.handleEmpty(req.body.meta.response_id),
    instant:        util.handleEmpty(req.body.meta.issue_instant),
    inResponseTo:   false, // todo: build out request parsing
    destination:    destination,
    issuer:         options.issuer,
    samlStatusCode: 'urn:oasis:names:tc:SAML:2.0:status:Success',
    assertion:      assertion
  });

  res.end(JSON.stringify({ formattedResponse: pd.xml(response),
                           rawResponse:       response,
                           actionURL:         destination,
                           RelayState:        RelayState,
                           SAMLResponse:      util.b64Response(response)
  }));
}
