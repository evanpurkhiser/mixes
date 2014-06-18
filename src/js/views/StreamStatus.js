'use strict';

var Backbone   = require('backbone'),
    underscore = require('underscore'),
    moment     = require('moment'),
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

    /**
     * Handle updating the 'started streaming' statistic every so often
     */
    watchStartedTime: function()
    {
        var start_date = moment(new Date(this.model.get('stream_start'))),
            element    = this.$('.start-time'),
            startWatch = function()
            {
                element.text(start_date.fromNow());
            };

        startWatch();

        if (this.startedTimer === undefined)
        {
            this.startedTimer = setInterval(startWatch, 5000);
        }

        return this;
    },

    /**
     * Called just after the JS event loop ticks over after rendering. Primarily
     * useful for when we need to
     */
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

            this.watchStartedTime();
        }

        underscore.defer(underscore.bind(this.postRender, this));

        return this;
    },
});
