(function () {
    angular
        .module("SEO")
        .controller("ScheduleCtrl", ScheduleCtrl)

    ScheduleCtrl.$inject = ["$state", "user"];

    function ScheduleCtrl($state, user) {

        var vm = this;

        if(!user){
            $state.go("login");
        }

    }
})();