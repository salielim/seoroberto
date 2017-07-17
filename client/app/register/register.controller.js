(function () {
    angular
        .module("DMS")
        .controller("RegisterCtrl", ["$sanitize", "$state", "AuthFactory", "Flash", RegisterCtrl]);

    function RegisterCtrl($sanitize, $state, AuthFactory, Flash){
        var vm = this;
        vm.email = "";
        vm.password = "";
        vm.confirmPassword = "";

        vm.register = function () {
            AuthFactory.register($sanitize(vm.email), $sanitize(vm.password))
                .then(function () {
                    vm.disabled = false;

                    vm.email = "";
                    vm.password = "";
                    vm.confirmPassword = "";
                    Flash.clear();
                    Flash.create('success', "Successfully sign up with us, Please proceed to login", 0, {class: 'custom-class', id: 'custom-id'}, true);
                    $state.go("SignIn");
                }).catch(function () {
                console.error("registration having issues");
            });
        };

    }
})();