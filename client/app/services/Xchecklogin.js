(function () {
    angular.module("DMS").run(function ($rootScope, $state, AuthService) {
        $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
            if (toState.authenticate && !AuthService.isAuthenticated()) {
                // User isn’t authenticated
                $state.transitionTo("login");
                event.preventDefault();
            }
        });
    });
})();