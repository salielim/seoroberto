(function () {
    angular
        .module("DMS")
        .controller("RegisterCtrl", RegisterCtrl);
    
    RegisterCtrl.$inject = ['$http'];

    function RegisterCtrl($http){
        var vm = this;
        vm.email = "";
        vm.password = "";

        vm.register = function (data) {
            console.log("Email: " + vm.email);
            return $http({
                method: 'POST',
                url: '/api/register',
                data: {
                        email: vm.email,
                        password: vm.password,
                      }
            });
        };
    }
})();