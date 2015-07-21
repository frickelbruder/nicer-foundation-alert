;(function ($, window, document, undefined) {
    'use strict';

    Foundation.libs.nicerAlert = {
        name : 'nicerAlert',

        version : '{{VERSION}}',

        settings : {
            position: 'top-center',
            callback : function () {}
        },

        init : function (scope, method, options) {
            $.extend(true, this.settings, method, options);
            this.bindings(method, options);
            this.S('body').append('<div class="nicer-alert-container nicer-alert-' + this.settings.position + '"></div>');
        },

        events : function () {
            var self = this,
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
            });
        },

        alert: function(message, type) {
            $('.nicer-alert-container').append('<div data-alert class="alert-box ' + type + ' round">' +
                message +
                '<a href="#" class="close">&times;</a>' +
                '</div>');
        },

        reflow : function () {}
    };
}(jQuery, window, window.document));
