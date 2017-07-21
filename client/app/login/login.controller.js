(function () {
    angular
        .module("DMS")
        .controller("LoginCtrl", LoginCtrl);
    
    LoginCtrl.$inject = ['$http'];

    function LoginCtrl($http){
        var vm = this;
        vm.email = "";
        vm.password = "";

        vm.login = function (user) {
            console.log("Email: " + vm.email);
            return $http({
                method: 'POST',
                url: '/login',
                data: {
                        email: vm.email,
                        password: vm.password,
                      }
            });
        };
    }
})();