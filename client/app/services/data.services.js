(function () {
    angular
        .module("DMS")
        .service("DataService", DataService);

    DataService.$inject = ["$http","$q"];

    function DataService ($http, $q) {

        var vm = this;

        vm.retrieveAll = retrieveAll;

        function retrieveAll (){
            console.log("* DataService: retrieveAll");
            var defer = $q.defer();
            
            $http.get("/api/data", {
            }).then(function (results) {
                console.log("> Service Result:", results);
                // Return result data to controller
                return defer.resolve(results.data);
            }).catch(function (err) {
                console.log("> Service Error:", err);
                // Return error to controller
                return defer.reject(err);
            });
            return defer.promise;
        };
    }
})();
    