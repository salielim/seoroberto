(function () {
    angular
        .module("DMS")
        .controller("RegisterCtrl", RegisterCtrl);
    
    RegisterCtrl.$inject = ['$http'];

    function RegisterCtrl($http){
        var vm = this;
        vm.email = "";
        vm.password = "";

        vm.register = function (user) {
            console.log("Email: " + vm.email);
            return $http({
                method: 'POST',
                url: '/register',
                data: {user: user}
            });
        };
    }
})();