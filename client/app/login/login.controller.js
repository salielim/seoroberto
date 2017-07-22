(function () {
    angular
        .module("DMS")
        .controller("LoginCtrl", ["$http", "$state", "$rootScope", LoginCtrl]);
    
    LoginCtrl.$inject = ["$http", "$state", "$rootScope"];

    function LoginCtrl($http, $state, $rootScope){
        var vm = this;
        vm.email = "";
        vm.password = "";

        vm.login = function (user) {
            console.log("Email: " + vm.email);
            return $http({
                method: "POST",
                url: "/login",
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
                    // console.log("failed block entry")
                    // $state.go("login");
                    vm.msg = "Failed login, please check your email or password.";
                }
            })
            .catch(function(err){
                console.log(err);
            });
        };       
    }
})();