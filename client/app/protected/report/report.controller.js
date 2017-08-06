(function () {
    angular
        .module("SEO")
        .controller("ReportCtrl", ReportCtrl)

    ReportCtrl.$inject = ["$state", "user"];

    function ReportCtrl($state, user) {

        var vm = this;

        if(!user){
            $state.go("login");
        }

    }
})();