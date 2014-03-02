var saml20      = require('saml').Saml20,
    pd          = require('pretty-data').pd,
    fs          = require('fs'),
    path        = require('path');
    templates   = require('../lib/templates'),
    util        = require('../lib/util'),
    testing     = require('../config/testing');


exports.display = function(req, res){
   res.render('saml', { SAMLRequest: req.query.SAMLRequest || '',
                        RelayState:  req.query.RelayState  || ''});
}

exports.generate = function(req, res){
  var options = {
    cert:              fs.readFileSync(path.join(__dirname, testing.cert).replace('/routes', '')),
    key:               fs.readFileSync(path.join(__dirname, testing.key).replace('/routes', '')),
    issuer:            'generalSSO',
    lifetimeInSeconds: 600,
    audiences:         'zendesk.com',
    attributes:        req.body.attrs,
    nameIdentifier:    util.handleEmpty(req.body.nameid) || ' '
  };

  var assertion = saml20.create(options);
  var destination = 'https://' + util.handleEmpty(req.body.meta.destination) + '/access/saml';
  var relayState = util.handleEmpty(req.body.meta.relay_state) || ' ';

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
                           SAMLResponse:      util.urlSafeResponse(response)
  }));
}
