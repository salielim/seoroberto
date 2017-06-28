
// Always use an IIFE, i.e., (function() {})();
(function () {
    // Attaches DeptService service to the DMS module
    angular
        .module("DMS")
        .service("DeptService", DeptService);

    // Dependency injection. Here we inject $http because we need this built-in service to communicate with the server
    // There are different ways to inject dependencies; $inject is minification safe
    DeptService.$inject = ['$http'];

    // DeptService function declaration
    // Accepts the injected dependency as a parameter. We name it $http for consistency, but you may assign any name
    function DeptService($http) {

        // Declares the var service and assigns it the object this (in this case, the DeptService). Any function or
        // variable that you attach to service will be exposed to callers of DeptService, e.g., search.controller.js
        // and register.controller.js
        var service = this;

        // Exposed data models -----------------------------------------------------------------------------------------
        // Exposed functions -------------------------------------------------------------------------------------------
        service.insertDept = insertDept;
        service.retrieveDept = retrieveDept;
        service.retrieveDeptDB = retrieveDeptDB;
        service.retrieveDeptManager = retrieveDeptManager;

        // Function declaration and definition -------------------------------------------------------------------------

        // insertDept uses HTTP POST to send department information to the server's /departments route
        // Parameters: department information; Returns: Promise object
        function insertDept(department) {
            // This line returns the $http to the calling function
            // This configuration specifies that $http must send the department data received from the calling function
            // to the /departments route using the HTTP POST method. $http returns a promise object. In this instance
            // the promise object is returned to the calling function\

            return $http({
                method: 'POST'
                , url: 'departments'
                , data: {dept: department}
            });
        }

        // retrieveDept retrieves department information from the server via HTTP GET.
        // Parameters: None. Returns: Promise object
        function retrieveDept(){
            return $http({
                method: 'GET'
                , url: 'departments'
            });
        }

        // retrieveDept retrieves department information from the server via HTTP GET.
        // Parameters: searchString. Returns: Promise object
        function retrieveDeptDB(searchString){
            return $http({
                method: 'GET'
                , url: 'departmentsDB'
                , params: {
                    'searchString': searchString
                }
            });
        }

        // retrieveDeptManager retrieves department information from the server via HTTP GET.
        // Parameters: searchString. Returns: Promise object
        function retrieveDeptManager(searchString){
            return $http({
                method: 'GET'
                , url: 'deptManagers'
                , params: {
                    'searchString': searchString
                }
            });
        }
    }
})();