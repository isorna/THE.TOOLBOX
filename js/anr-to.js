/*jslint indent: 4 */
/*global document, window, $, console, Backbone */

var gfGetURL, goANRTO;

// START encapsulation
(function () {
    'use strict';

    /* 
     * Get file by ajax method
     * pcDataType: 'script', 'text', 'html', 'json', 'jsonp', 'xml'
     * @todo: decide if we'll allow non-cachable scripts with cache parameter:
     * cache: (pcDataType == 'script') ? true : false
     * @todo: decide if we send some log message in case of an error
     */
    gfGetURL = function (pcURL, pbAsync, pfCallback, pcDataType) {
        var rData = 'Failed to load URL: ' + pcURL;
        pcDataType = pcDataType || 'text';
    
        $.ajax({
            async: pbAsync,
            url: pcURL,
            dataType: pcDataType,
            cache: true,
            success: pfCallback || function (poResponse) {
                rData = poResponse;
            },
            error: function (poResponse) {
                console.error('[ERROR] ' + rData, poResponse);
            }
        });
    
        return rData;
    };
    
    /*
     * APP object declaration
     */
    goANRTO = {
        initialize: function () {}
    };
    
    /*
     * START document.ready()
     */
    $(document).ready(function () {
        // APP initialization
        goANRTO.initialize();
    });
    // END encapsulation
}());