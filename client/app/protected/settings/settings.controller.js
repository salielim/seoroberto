(function () {
    angular
        .module("SEO")
        .controller("SettingsCtrl", SettingsCtrl);

        SettingsCtrl.$inject = ["$http"];

        function SettingsCtrl($http){
            var vm = this;
            vm.user = [];
            
            userDetails();

            function userDetails() {
                console.log("in userDetails");
            }
                return $http({
                    method: "GET"
                    , url: "/settings"
            })
            .then(function(results){
                vm.user = results.data;
                console.log("data:  " + results.data);
            })
            .catch(function(err){
                console.log("error " + err);
            });  
        }
})();