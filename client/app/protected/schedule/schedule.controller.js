(function () {
    angular
        .module("SEO")
        .controller("ScheduleCtrl", ScheduleCtrl)

    ScheduleCtrl.$inject = ["$state", "$http", "user"];

    function ScheduleCtrl($state, $http, user) {

        var vm = this;

        vm.schedule = "";
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
                        schedule: vm.schedule
                      }
            })
            .then(function(data){
                console.log("Success!")
                if (vm.schedule=="none") {
                    vm.msg = "Success, scheduled scan has been disabled."
                } else {
                    vm.msg = "Success, your scan will be performed " + vm.schedule + ".";
                }
            })
            .catch(function(err){
                console.log(err);
                vm.msg = "Failed, please try again.";
            });
        };
    }
})();