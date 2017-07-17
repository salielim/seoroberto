(function () {
    angular
        .module("DMS")
        .controller("RegisterCtrl", ["$state", RegisterCtrl]);

    function RegisterCtrl($state, AuthFactory){
        var vm = this;
        vm.email = "";
        vm.password = "";
        vm.confirmPassword = "";

        vm.register = function () {
            AuthFactory.register()
                .then(function () {
                    vm.disabled = false;

                    vm.email = "";
                    vm.password = "";
                    vm.confirmPassword = "";
                    // Flash.clear();
                    // Flash.create('success', "Successfully sign up with us, Please proceed to login", 0, {class: 'custom-class', id: 'custom-id'}, true);
                    // $state.go("SignIn");
                }).catch(function () {
                console.error("registration having issues");
            });
        };

    }
})();