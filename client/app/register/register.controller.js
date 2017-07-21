(function () {
    angular
        .module("DMS")
        .controller("RegisterCtrl", RegisterCtrl);
    
    RegisterCtrl.$inject = ['$http', '$state'];

    function RegisterCtrl($http, $state){
        var vm = this;
        vm.email = "";
        vm.password = "";

        vm.register = function (data) {
            console.log("Email: " + vm.email);
            return $http({
                method: 'POST',
                url: '/register',
                data: {
                        email: vm.email,
                        password: vm.password,
                      }
            })
            .then(function(user){
                console.log(user);
                if(user.data)
                    $state.go("scan");
                else {
                    console.log('failed block entry')
                    $state.go('register');
                }
            })
            .catch(function(err){
                console.log(err);
            });
        };
    }
})();