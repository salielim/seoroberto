(function () {
    angular
        .module("SEO")
        .service("DataService", DataService);

    DataService.$inject = ["$http","$q"];

    function DataService ($http, $q) {

        var vm = this;

        vm.retrieveAll = retrieveAll;
        vm.retrieveScanned = retrieveScanned;

        function retrieveAll (){
            var defer = $q.defer();
            
            $http.get("/api/data", {
            }).then(function (results) {
                return defer.resolve(results.data);
            }).catch(function (err) {
                console.log(err);
                return defer.reject(err);
            });
            return defer.promise;
        };

        function retrieveScanned (){
            var defer = $q.defer();
            
            $http.get("/api/scanned", {
            }).then(function (results) {
                return defer.resolve(results.data);
            }).catch(function (err) {
                console.log(err);
                return defer.reject(err);
            });
            return defer.promise;
        };
    }
})();
    