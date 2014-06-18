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
        this.$el.html(template.render(this.model.attributes));

        this.listenTo(this.model, 'change', this.render);
    },

    postRender: function()
    {
        this.$el.toggleClass('live', this.model.get('active'));
    },

    render: function()
    {
        if (this.model.get('active'))
        {
            this.$('.genre').text(this.model.get('genre'));
            this.$('.listeners').text(this.model.get('listeners'));
            this.$('.listener-peak').text(this.model.get('listener_peak'));
        }

        underscore.defer(underscore.bind(this.postRender, this));

        return this;
    },
});
