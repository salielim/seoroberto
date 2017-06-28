
// Always use an IIFE, i.e., (function() {})();
(function () {
    // Attaches a SearchCtrl to the DMS module
    angular
        .module("DMS")
        .controller("SearchCtrl", SearchCtrl);

    // Dependency injection. An empty [] means RegCtrl does not have dependencies. Here we inject DeptService so
    // RegCtrl can call services related to department.
    // Dependency injection. An empty [] means SearchCtrl does not have dependencies
    SearchCtrl.$inject = ['DeptService'];

    // Search function declaration
    function SearchCtrl(DeptService) {

        // Declares the var vm (for ViewModel) and assigns it the object this (in this case, the SearchCtrl). Any
        // function or variable that you attach to vm will be exposed to callers of SearchCtrl, e.g., search.html
        var vm = this;

        // Exposed data models -----------------------------------------------------------------------------------------
        vm.departments = [];

        // Exposed functions ------------------------------------------------------------------------------------------
        // Exposed functions can be called from the view. Currently, search.controller.js doesn't have any exposed
        // functions

        // Initializations --------------------------------------------------------------------------------------------
        // Functions that are run when view/html is loaded
        // init is a private function (i.e., not exposed)
        init();

        // Function declaration and definition -------------------------------------------------------------------------
        // The init function initializes view
        function init() {

            // We call DeptService.retrieveDept to handle retrieval of department information. The data retrieved from
            // this function is used to populate search.html.
            DeptService
                .retrieveDept()
                .then(function(results){
                    vm.departments = results.data;
                })
                .catch(function(err){
                    console.log("error " + err);
                });
        }

    }
})();