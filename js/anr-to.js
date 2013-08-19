/*jslint indent: 4, nomen: true */
/*global document, window, $, _, console, Backbone */

// START encapsulation
(function (poGlobals) {
    'use strict';
    
    /*
     * APP object declaration
     */
    poGlobals.goANRTO = {
        cache: {},
        initialize: function () {
            // Views
            /*
            poGlobals.goANRTO.cache.views = {
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
            };*/
            
            // INIT ROUTER
            /*
            poGlobals.goANRTO.cache.router = new (Backbone.Router.extend({
                routes: {
                    'ANR-TO/': 'home',
                    'ANR-TO/ *path': '404'
                },
                home: function () {
                    poGlobals.goANRTO.cache.views.home.render();
                },
                404: function (pcPath) {
                    console.log('[404]', pcPath);
                }
            }));*/
    
            // History
            Backbone.history.start({pushState: true, hashChange: true});
    
            // CAPTURE pushState
            $(document).on("click", "a[href^='/']", function (poEvent) {
                var cUrl = '';
                
                if (!poEvent.altKey && !poEvent.ctrlKey && !poEvent.metaKey && !poEvent.shiftKey) {
                    poEvent.preventDefault();
                    cUrl = $(poEvent.currentTarget).attr("href").replace(/^\//, "");
                    poGlobals.goANRTO.cache.router.navigate(cUrl, {trigger: true});
                }
            });
        }
    };

    /* 
     * Get file by ajax method
     * pcDataType: 'script', 'text', 'html', 'json', 'jsonp', 'xml'
     * @todo: decide if we'll allow non-cachable scripts with cache parameter:
     * cache: (pcDataType == 'script') ? true : false
     * @todo: decide if we send some log message in case of an error
     */
    poGlobals.goANRTO._GetURL = function (pcURL, pbAsync, pfCallback, pcDataType) {
        poGlobals.goANRTO.rData = 'Failed to load URL: ' + pcURL;
        pcDataType = pcDataType || 'text';
    
        $.ajax({
            async: pbAsync,
            url: pcURL,
            dataType: pcDataType,
            cache: true,
            success: pfCallback || function (poResponse) {
                poGlobals.goANRTO.rData = poResponse;
            },
            error: function (poResponse) {
                console.error('[ERROR] ' + poGlobals.goANRTO.rData, poResponse);
            }
        });
    
        return poGlobals.goANRTO.rData;
    };
	
    /*
     * indexedDB support
     * @read: http://www.sitepoint.com/creating-a-notepad-app-with-indexeddb/
     */
    poGlobals.goANRTO._indexedDBSupport = function () {
        window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
        window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
        window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
        
        if (!window.indexedDB) {
            console.error('[ERROR] No IndexedDB support');
        } else {
            console.info('IndexedDB support detected');
        }
    };
    
    /*
     * START document.ready()
     */
    $(document).ready(function () {
        // APP initialization
        poGlobals.goANRTO.initialize();
    });
    // END encapsulation
}(this));
