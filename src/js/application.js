'use strict';

var Backbone   = require('backbone');
    Backbone.$ = require('jquery');

var BackbonePoller   = require('backbone-poller'),
    StreamStatus     = require('./models/StreamStatus'),
    StreamStatusView = require('./views/StreamStatus');

// Setup stream status model
var streamStatus = new StreamStatus();
var streamPoller = BackbonePoller.get(streamStatus, {delay: 5000}).start();

var streamStatusView = new StreamStatusView({model: streamStatus});
