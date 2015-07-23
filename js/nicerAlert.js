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
            position: 'bottom-right',
            containerId: 'nicer-alert-container',
            callback : function () {},
            template: '<div data-alert class="alert-box {type} radius">{message}<a href="#" class="close">&times;</a></div>',
            showMax: 4,
            visibleTimer: 2500,
            containerWidth: 70,
            containerWidthUnit: '%'
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
            this.autohideAlertBox(alertBox);
        },

        getAlertId: function() {
            return Foundation.utils.random_str();
        },

        autohideAlertBox: function(alertBox) {
            var timeout = this.settings.visibleTimer || 0;
            if( parseInt(timeout) == 0 ) {
                return;
            }

            window.setTimeout(function() {
                $(document).foundation('nicerAlert', 'removeAlert', $(alertBox));
            }, timeout);
        },

        ensureContainer: function() {
            if(this.S('#' + this.settings.containerId).length > 0) {
                return;
            }

            var styles = this.buildInlineStyle();
            this.S('body').append('<div data-nicerAlert id="' + this.settings.containerId + '" style="' + styles + '" class="nicer-alert-' + this.settings.position + '"></div>');
        },

        buildInlineStyle: function() {
            var styles = 'width: ' + this.settings.containerWidth + this.settings.containerWidthUnit + ';';
            switch(this.settings.position) {
                case 'middle-center' :
                case 'top-center' :
                case 'bottom-center' : styles += 'margin-left: -' + (this.settings.containerWidth/2) + this.settings.containerWidthUnit + ';'
            }
            return styles;
        },

        ensureMaximumAlerts: function() {
            var $alertBoxes = this.S(this.scope).find('[data-alert]:not(.nicerAlert-removing)'),
                visibleAlerts = $alertBoxes.length,
                self = this;

            if(visibleAlerts < this.settings.showMax - 1) {
                return;
            }

            var itemsToRemove = visibleAlerts - this.settings.showMax + 1,
                $alertBoxesToRemove = $alertBoxes.slice(0, itemsToRemove);

            $alertBoxesToRemove.each(function() {
                self.removeAlert(self.S(this));
            });
        },

        removeAlert: function($alert) {
            $alert.find('.close').click();
        },

        reflow : function () {}
    };
}(jQuery, window, window.document));
