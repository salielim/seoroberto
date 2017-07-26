(function () {
    angular
        .module("SEO")
        .controller("SettingsCtrl", SettingsCtrl);

        SettingsCtrl.$inject = ["$http"];

        function SettingsCtrl($http){
            var vm = this;

            settings();

            function settings (user) {
                console.log("Finding Email of user...");
                return $http({
                    method: "GET",
                    url: "/settings"
                })
                .then(function(user){
                    console.log(user);
                })
                .catch(function(err){
                    console.log(err);
                });
            };       
        }
})();