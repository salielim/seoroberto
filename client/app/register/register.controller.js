(function () {
    angular
        .module("DMS")
        .controller("RegisterCtrl", ["$http", "$state", "$rootScope", RegisterCtrl]);
    
    RegisterCtrl.$inject = ["$http", "$state", "$rootScope"];

    function RegisterCtrl($http, $state, $rootScope){
        var vm = this;
        vm.email = "";
        vm.password = "";

        vm.msg = "";

        vm.register = function (data) {
            console.log("Email: " + vm.email);
            return $http({
                method: "POST",
                url: "/register",
                data: {
                        email: vm.email,
                        password: vm.password,
                      }
            })
            .then(function(user){
                console.log(user);
                if(user.data) {
                    $state.go("scan");
                    $rootScope.currentUser = user;
                } else {
                    // console.log("failed registration");
                    // $state.go("register");
                    vm.msg = "Failed registration, please check if you already have an account with us.";
                }
            })
            .catch(function(err){
                console.log(err);
            });
        };
    }
})();