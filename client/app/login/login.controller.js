(function() {
  angular
    .module("SEO")
    .controller("LoginCtrl", ["$http", "$state", "$rootScope", LoginCtrl]);

  LoginCtrl.$inject = ["$http", "$state", "$rootScope"];

  function LoginCtrl($http, $state, $rootScope) {
    var vm = this;
    vm.email = "";
    vm.password = "";

    vm.login = function(user) {
      return $http({
        method: "POST",
        url: "/login",
        data: {
          email: vm.email,
          password: vm.password
        }
      })
        .then(function(user) {
          ßÍ;
          if (user.data) {
            $state.go("data");
            $rootScope.currentUser = user;
          } else {
            vm.msg = "Failed login, please check your email or password.";
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    };
  }
})();
