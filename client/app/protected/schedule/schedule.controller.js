(function() {
  angular.module("SEO").controller("ScheduleCtrl", ScheduleCtrl);

  ScheduleCtrl.$inject = ["$state", "$http", "$q", "user"];

  function ScheduleCtrl($state, $http, $q, user) {
    var vm = this;

    vm.frequency = "";
    vm.domain = "";

    vm.msg = "";
    vm.scheduleDomain = "";
    vm.scheduleFreq = "";

    if (!user) {
      $state.go("login");
    }

    // Retrieve User Schedule
    retrieveSchedule();
    function retrieveSchedule() {
      var defer = $q.defer();

      $http
        .get("/api/schedule", {})
        .then(function(results) {
          vm.scheduleDomain = results.data[0].schedule_domain;
          vm.scheduleFreq = results.data[0].schedule_freq;
          return defer.resolve(results.data);
        })
        .catch(function(err) {
          console.log(err);
          return defer.reject(err);
        });
      return defer.promise;
    }

    // Schedule Form
    vm.automate = function(data) {
      return $http({
        method: "POST",
        url: "/api/schedule",
        data: {
          frequency: vm.frequency,
          domain: vm.domain
        }
      })
        .then(function(data) {
          if (vm.frequency == "none") {
            vm.msg = "Success, scheduled scan has been disabled.";
          } else {
            vm.msg =
              "Success, scheduled scan for " +
              vm.domain +
              " will be performed " +
              vm.frequency +
              ".";
          }
        })
        .catch(function(err) {
          console.log(err);
          vm.msg = "Failed, please try again.";
        });
    };
  }
})();
