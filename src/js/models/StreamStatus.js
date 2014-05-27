'use strict';

var Backbone = require('backbone'),
    config   = require('../config');

module.exports = Backbone.Model.extend(
{
    // Before the icecast mount point list is loaded the status is unknown
    defaults: {active: undefined},

    // Load data from the configured icecast JSON. This should be in the format
    // defined by this XSLT JSON transofmration file here [1]
    //
    // [1] https://github.com/MechanisM/jquery-icecast/blob/master/web/json.xsl
    url: config.ice_status,

    /**
     * Determine the status of the stream from the response and extract the
     * mount information, instead of using the toplevel data
     *
     * @param  {Object} response Data returned from the fetch reqeust
     * @param  {Object} options  Request options
     * @return {Object}
     */
    parse: function(response, options)
    {
        // Check if we have an active mount point
        for (var mountPoint in response.mounts) break;
        var isActive = mountPoint !== undefined;

        this.set({active: isActive}, {silent: true});

        if(isActive)
        {
            delete response.mounts[mountPoint].title;
            delete response.mounts[mountPoint].current_song;

            return response.mounts[mountPoint];
        }

        if (this.hasChanged('active'))
        {
            this.clear({silent: true});

            return {active: false};
        }
    },
});
