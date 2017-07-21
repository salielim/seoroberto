(function () {
    angular
        .module("DMS")
        .controller("IndexCtrl", ["$q", "$rootScope", "$state", "$location", "$http", IndexCtrl]);

    IndexCtrl.$inject = ["$q", "$rootScope", "$state", "$location", "$http"];

    function IndexCtrl($q, AuthFactory, $rootScope, $state, $location, $http) {
        var vm = this;

        getUserStatus(function(result){
             vm.isUserLogon = result;
        });

        function getUserStatus(callback) {
            $http.get("/status/user")
                // handle success
                .then(function (data) {
                    var authResult = JSON.stringify(data);
                    if (data["data"] != '') {
                        user = true;
                        callback(user);
                    } else {
                        user = false;
                        callback(user);
                    }
                });
        }

        vm.isUserLogon = isLoggedIn();

        $rootScope.$watch('user', function () {
            console.log(vm.isUserLogon);
            console.log($state.$current.url);
            if ($state.$current.url != "" && !vm.isUserLogon) {
                $state.go('SignIn');
            }
        });


        var defer = $q.defer();
        vm.err = null;

        vm.isActive = function (viewLocation) {
            //console.log(viewLocation);
            console.log($location.path());
            return viewLocation === $location.path();
        };
    }
})();