(function() {
  angular
    .module("SEO")
    .controller("RegisterCtrl", [
      "$http",
      "$state",
      "$rootScope",
      RegisterCtrl
    ]);

  RegisterCtrl.$inject = ["$http", "$state", "$rootScope"];

  function RegisterCtrl($http, $state, $rootScope) {
    var vm = this;
    vm.email = "";
    vm.password = "";

    vm.msg = "";

    vm.register = function(data) {
      return $http({
        method: "POST",
        url: "/register",
        data: {
          email: vm.email,
          password: vm.password
        }
      })
        .then(function(user) {
          if (user.data) {
            $state.go("data");
            $rootScope.currentUser = user;
          } else {
            ß;
            vm.msg =
              "Failed registration, please check if you already have an account with us.";
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    };
  }
})();
