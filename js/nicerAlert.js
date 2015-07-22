;(function ($) {
    'use strict';

    Foundation.libs.nicerAlert = {
        name : 'nicerAlert',

        version : '{{VERSION}}',

        settings : {
            position: 'top-center',
            containerId: 'nicer-alert-container',
            callback : function () {},
            template: '<div data-alert class="alert-box {type} round">{message}<a href="#" class="close">&times;</a></div>'
        },

        init : function (scope, method, options) {
            $.extend(true, this.settings, method, options);
            this.bindings(method, options);

        },

        events : function () {
            /*            var self = this,
             S = this.S;

             $(this.scope).off('.alert').on('click.fndtn.alert', '[' + this.attr_name() + '] .close', function (e) {
             var alertBox = S(this).closest('[' + self.attr_name() + ']'),
             settings = alertBox.data(self.attr_name(true) + '-init') || self.settings;

             e.preventDefault();
             if (Modernizr.csstransitions) {
             alertBox.addClass('alert-close');
             alertBox.on('transitionend webkitTransitionEnd oTransitionEnd', function (e) {
             S(this).trigger('close.fndtn.alert').remove();
             settings.callback();
             });
             } else {
             alertBox.fadeOut(300, function () {
             S(this).trigger('close.fndtn.alert').remove();
             settings.callback();
             });
             }
             });*/
        },

        alert: function(options) {
            if(!options || !options.message) {
                return;
            }
            var message = options.message,
                type = options.type || "info";
            this.ensureContainer();
            this.S('#' + this.settings.containerId).append(
                this.settings.template.replace(/\{type}/, type).replace(/\{message}/, message)
            );
        },

        ensureContainer: function() {
            if(this.S('#' + this.settings.containerId).length > 0) {
                return;
            }
            this.S('body').append('<div data-nicerAlert id="' + this.settings.containerId + '" class="nicer-alert-' + this.settings.position + '"></div>');
        },

        reflow : function () {}
    };
}(jQuery, window, window.document));
