'use strict';

var Backbone   = require('backbone'),
    underscore = require('underscore'),
    template   = require('../../templates/stream_status.mustache');

module.exports = Backbone.View.extend(
{
    className: 'live-stream-status',

    initialize: function()
    {
        this.$el.insertAfter('#description');
        this.listenTo(this.model, 'change', this.render);
    },

    postRender: function()
    {
        this.$el.toggleClass('live', this.model.get('active'));
    },

    render: function()
    {
        this.$el.html(template.render(this.model.attributes));

        underscore.defer(underscore.bind(this.postRender, this));

        return this;
    },
});
