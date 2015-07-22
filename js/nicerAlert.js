;(function ($) {
    'use strict';

    function buildTemplate(template, options, newId) {
        var message = options.message,
            type = options.type || "info",
            alertBox = template.replace(/\{type}/, type).replace(/\{message}/, message);
        return $(alertBox).attr('data-nicerAlert-id', newId);
    }

    Foundation.libs.nicerAlert = {
        name : 'nicerAlert',

        version : '{{VERSION}}',

        settings : {
            position: 'top-center',
            containerId: 'nicer-alert-container',
            callback : function () {},
            template: '<div data-alert class="alert-box {type} radius">{message}<a href="#" class="close">&times;</a></div>',
            showMax: 4,
            visibleTimer: 2500
        },

        init : function (scope, method, options) {
            $.extend(true, this.settings, method, options);
            this.bindings(method, options);

        },

        events : function () {
        },

        alert: function(options) {
            if(!options || !options.message) {
                return;
            }

            this.ensureContainer();
            this.ensureMaximumAlerts();
            var alertBox = buildTemplate(this.settings.template, options, this.getAlertId());
            this.S('#' + this.settings.containerId).append(
                alertBox
            );
        },

        getAlertId: function() {
            return Foundation.utils.random_str();
        },

        ensureContainer: function() {
            if(this.S('#' + this.settings.containerId).length > 0) {
                return;
            }
            this.S('body').append('<div data-nicerAlert id="' + this.settings.containerId + '" class="nicer-alert-' + this.settings.position + '"></div>');
        },

        ensureMaximumAlerts: function() {
            var $alertBoxes = this.S(this.scope).find('[data-alert]:not(.nicerAlert-removing)'),
                visibleAlerts = $alertBoxes.length,
                self = this;
            debugger;
            if(visibleAlerts < this.settings.showMax - 1) {
                return;
            }

            var itemsToRemove = visibleAlerts - this.settings.showMax + 1,
                $alertBoxesToRemove = $alertBoxes.slice(0, itemsToRemove);

            $alertBoxesToRemove.each(function() {
                self.removeAlert($(this));
            });
        },

        removeAlert: function($alert) {
            $alert.find('.close').click();
        },

        reflow : function () {}
    };
}(jQuery, window, window.document));
