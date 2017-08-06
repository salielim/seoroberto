(function () {
    angular
        .module("SEO")
        .controller("ScheduleCtrl", ScheduleCtrl)

    ScheduleCtrl.$inject = ["$state", "$http", "user"];

    function ScheduleCtrl($state, $http, user) {

        var vm = this;

        vm.frequency = "";
        vm.domain = "";
        vm.msg = "";

        if(!user){
            $state.go("login");
        }

        vm.automate = function (data) {
            console.log("Schedule: " + vm.schedule);
            return $http({
                method: "POST",
                url: "/api/schedule",
                data: {
                        frequency: vm.frequency,
                        domain: vm.domain
                      }
            })
            .then(function(data){
                if (vm.frequency=="none") {
                    vm.msg = "Success, scheduled scan has been disabled."
                } else {
                    vm.msg = "Success, scheduled scan for " + vm.domain + " will be performed " + vm.frequency + ".";
                }
            })
            .catch(function(err){
                console.log(err);
                vm.msg = "Failed, please try again.";
            });
        };
    }
})();