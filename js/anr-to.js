/*jslint indent: 4 */
/*global document, window, $, console, Backbone */

var ANRTO = new Object();

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
    ANRTO._getURL = function (pcURL, pbAsync, pfCallback, pcDataType) {
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
     * ANRTO cache
     */
    ANRTO.cache = {};
	
    /*
     * ANRTO initialize method
     */
    ANRTO._initialize = function () {
		// Views
		ANRTO.cache.views = {
			home: new (Backbone.View.extend({
				id: 'homeWrapper',
				className: 'pageWrapper',
				template: $('#homeTemplate').html(),
				viewRendered: false,
				initialize: function () {},
				render: function () {
					var hVars = {
						cHeaderTitle: 'ANR: TO'
					};
					
					if (!this.viewRendered) {
						this.$el.html(_.template(this.template, hVars)).appendTo('body');
					} else {
						$('.pageWrapper').hide();
						this.$el.show();
					}
					
					return this;
				}
			}))
		};
		
        // INIT ROUTER
		ANRTO.cache.router = new (Backbone.Router.extend({
			routes: {
				'ANR-TO/': 'home',
				'ANR-TO/*path': '404'
			},
			home: function () {
				ANRTO.cache.views.home.render();
			},
			404: function (pcPath) {
				console.log('[404]', pcPath);
			}
		}));

        // History
        Backbone.history.start({pushState: true, hashChange: true});

        // CAPTURE pushState
        $(document).on("click", "a[href^='/']", function (poEvent) {
			var cUrl = '';
			
            if (!poEvent.altKey && !poEvent.ctrlKey && !poEvent.metaKey && !poEvent.shiftKey) {
                poEvent.preventDefault();
                cUrl = $(poEvent.currentTarget).attr("href").replace(/^\//, "");
                ANRTO.cache.router.navigate(cUrl, {trigger: true});
            }
        });
	};
    
    /*
     * START document.ready()
     */
    $(document).ready(function () {
        // APP initialization
        ANRTO._initialize();
    });
    // END encapsulation
}());