angular.module('notificationServices', []).
    factory('Notification', ['$filter','$rootScope', '$timeout', function ($filter,$rootScope, $timeout) {

        $rootScope.notification = {type:null,data:null};
        var active = false;
        var timer = null;
        var goldFilter = $filter('gold');
        var silverFilter = $filter('silver');

        return {

            hide: function () {
                $rootScope.notification = {type:null,data:null};
                active = false;
                timer = null;
            },

            animate: function () {
                if (timer) {
                    clearTimeout(timer);
                    timer = $timeout(this.hide, 2000)
                }
                if (active == false) {
                    active = true;
                    timer = $timeout(this.hide, 2000);
                }
            },

            push: function (message) {
                var notif = $rootScope.notification.data = {};
                $rootScope.notification.type = message.type;
                switch(message.type) {
                  case 'stats':
                    if (message.stats.gp) {
                      notif.gp = (message.stats.exp>0 ? '+':'')+ goldFilter(message.stats.gp);
                      notif.silver = silverFilter(message.stats.gp);
                    }
                    if (message.stats.exp)
                      notif.exp = (message.stats.exp>0 ? '+':'')+ message.stats.exp;
                    if (message.stats.hp)
                      notif.hp = message.stats.hp.toFixed(2)
                    break;
                  case 'text':
                    $rootScope.notification.data = message.text;
                    break;
                }

                this.animate()
            },

            get: function () {
                return data;
            },

            clearTimer: function () {
                $timeout.cancel(timer);
                timer = null;
                active = false;
            },

            init: function () {
                timer = $timeout(this.hide, 2000);
            }

        }

    }]);
